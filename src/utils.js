import lave from 'lave';
import {generate} from 'escodegen';

function objectToCode(object) {
  const func = lave(object, {generate, format: 'function'});
  return `(${func.replace(/;$/, '')})()`;
}

export function propsToCode(props) {
  // encode layers separately
  const {layers = []} = props;

  const otherProps = Object.assign({}, props, {layers: undefined});

  const layerProps = layers.filter(Boolean).map(layer => {
    const Layer = layer.constructor;
    const defaultProps = new Layer({}).props;
    const props = {};

    for (const key in layer.props) {
      if (layer.props[key] !== defaultProps[key]) {
        props[key] = layer.props[key];
      }
    }

    return {
      props,
      layerName: Layer.layerName
    };
  });

  return `(function() {
var props = ${objectToCode(otherProps)};
var layerProps = ${objectToCode(layerProps)};

props.layers = layerProps.map(function(layer) {
  var constructor = eval('DeckGL.' + layer.layerName);
  return new constructor(layer.props);
});

return props;
})()`;
}
