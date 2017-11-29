import * as deckglCore from 'deck.gl/dist/core';
import * as deckglLayers from 'deck.gl/dist/core-layers';
import * as LumaGL from 'luma.gl';

const win = typeof window === undefined ? global : window;
const doc = win.document;

const CANVAS_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

const VIEWPORT_PROPS = ['longitude', 'latitude', 'zoom', 'bearing', 'pitch'];
function extractMapboxViewport(props) {
  if (VIEWPORT_PROPS.every(name => !isFinite(props[name]))) {
    return null;
  }
  const viewport = {};
  if (isFinite(props.longitude) && isFinite(props.latitude)) {
    viewport.center = [props.longitude, props.latitude];
  }
  if (isFinite(props.zoom)) {
    viewport.zoom = props.zoom;
  }
  if (isFinite(props.bearing)) {
    viewport.bearing = props.bearing;
  }
  if (isFinite(props.pitch)) {
    viewport.pitch = props.pitch;
  }
  return viewport;
}

class DeckGL {

  constructor(props = {}) {
    if (!doc) {
      // Not browser
      return;
    }

    // Default options
    props = Object.assign({
      container: doc.body,
      mapbox: win.mapboxgl,
      mapStyle: 'mapbox://styles/mapbox/dark-v9',
      pitch: 0,
      bearing: 0,
      onViewportChange: () => {}
    }, props);

    const container = props.container;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const containerStyle = win.getComputedStyle(container);
    if (containerStyle.position === 'static') {
      container.style.position = 'relative';
    }

    const mapCanvas = doc.createElement('div');
    container.appendChild(mapCanvas);
    Object.assign(mapCanvas.style, CANVAS_STYLE);

    const deckCanvas = doc.createElement('canvas');
    container.appendChild(deckCanvas);
    Object.assign(deckCanvas.style, CANVAS_STYLE);

    this._map = props.mapbox && new props.mapbox.Map(Object.assign({
      container: mapCanvas,
      style: props.mapStyle,
      interactive: false
    }, extractMapboxViewport(props)));

    this._deck = new DeckGL.experimental.DeckGLJS(Object.assign({}, props, {
      canvas: deckCanvas,
      width,
      height
    }));

    const isMap = !props.viewport || (props.viewport instanceof DeckGL.WebMercatorViewport);

    this._controller = isMap && new DeckGL.experimental.MapControllerJS(Object.assign({}, props, {
      canvas: deckCanvas,
      width,
      height,
      onViewportChange: viewport => {
        this.setProps(viewport);
        props.onViewportChange(viewport);
      }
    }));

    this._resize = this._resize.bind(this);
    window.addEventListener('resize', this._resize);

    this._container = container;
  }

  finalize() {
    window.removeEventListener('resize', this._resize);
    this._deck.finalize();
    if (this._controller) {
      this._controller.finalize();
    }
    if (this._map) {
      this._map.remove();
    }
  }

  setProps(props) {
    this._deck.setProps(props);

    if (this._controller) {
      this._controller.setProps(props);
    }

    if (this._map) {
      const viewport = extractMapboxViewport(props);
      if (viewport) {
        this._map.jumpTo(viewport);
      }
      if (props.mapStyle) {
        this._map.setStyle(props.mapStyle);
      }
    }
  }

  _resize() {
    const container = this._container;
    this.setProps({
      width: container.clientWidth,
      height: container.clientHeight
    });
  }
}

win.DeckGL = Object.assign(DeckGL, deckglCore, deckglLayers);
win.LumaGL = LumaGL;
