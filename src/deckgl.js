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
      bearing: 0
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

    this._map = props.mapbox && new props.mapbox.Map({
      container: mapCanvas,
      style: props.mapStyle,
      center: [props.longitude, props.latitude],
      zoom: props.zoom,
      pitch: props.pitch,
      bearing: props.bearing,
      interactive: false
    });

    this._deck = new DeckGL.experimental.DeckGLJS(Object.assign({}, props, {
      canvas: deckCanvas,
      width,
      height
    }));

    this._controller = new DeckGL.experimental.MapControllerJS(Object.assign({}, props, {
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
    this._controller.finalize();
    this._deck.finalize();
    if (this._map) {
      this._map.remove();
    }
  }

  setProps(props) {
    this._deck.setProps(props);

    this._controller.setProps(props);

    if (this._map && Number.isFinite(props.longitude)) {
      this._map.jumpTo({
        center: [props.longitude, props.latitude],
        zoom: props.zoom,
        bearing: props.bearing || 0,
        pitch: props.pitch || 0
      });
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
