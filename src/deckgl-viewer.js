import {ValueViewerSymbol} from '@runkit/value-viewer';
import template from 'html-loader!./template.html';
import {propsToCode} from './utils';

const defaultProps = {
  longitude: -122.45,
  latitude: 37.8,
  zoom: 12,
  bearing: 0,
  pitch: 0,
  layers: [],
  style: {height: '400px'},
  map: true
};

function inject(key, target, string) {
  const startPattern = `/** START-${key} **/`;
  const endPattern = `/** END-${key} **/`;

  let startIndex = target.indexOf(startPattern);
  const endIndex = target.indexOf(endPattern);

  if (startIndex >= 0 && endIndex >= 0) {
    startIndex += startPattern.length;
    return target.slice(0, startIndex) + string + target.slice(endIndex);
  }

  return target;
}

export function getHTMLFromDeckGLProps(props) {
  props = Object.assign({}, defaultProps, props);

  const globalVars = {
    MapboxAccessToken: process.env.MapboxAccessToken
  };

  let result = template;

  result = inject('GLOBAL-VARS', result, Object.keys(globalVars).map(key => {
    return `const ${key} = ${JSON.stringify(globalVars[key])};`
  }).join('\n'));

  result = inject('USER-DATA', result, propsToCode(props));

  return result;
}

export function render(props) {
  return Object.assign(props, {
    [ValueViewerSymbol]: {
      title: 'deck.gl',
      HTML: getHTMLFromDeckGLProps(props)
    }
  });
};
