import {ValueViewerSymbol} from '@runkit/value-viewer';
import template from 'html-loader!./template.html';
import {propsToCode} from './utils';

const CDN_URL = 'https://cdn.rawgit.com/Pessimistress/deck.gl-runkit/master/dist/';

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

  const globalVars = {
    MapboxAccessToken: process.env.MapboxAccessToken
  };

  let result = template.replace(/..\/dist\//g, CDN_URL);

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
