import {ValueViewerSymbol} from '@runkit/value-viewer';
import lave from 'lave';
import {generate} from 'escodegen';
import template from 'html-loader!./template.html';

const CDN_URL = 'https://raw.githubusercontent.com/Pessimistress/deck.gl-runkit/master/dist/';

function toCode(object) {
  return lave(object, {generate, format: 'expression'});
}

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
    return `const ${key} = ${globalVars[key]};`
  }).join('\n'));

  result = inject('USER-DATA', result, toCode(props));

  return result;
}

export function getRunkitViewer(props) {
  return Object.assign(props, {
    [ValueViewerSymbol]: {
      title: 'deck.gl',
      HTML: getHTMLFromDeckGLProps(props)
    }
  });
};
