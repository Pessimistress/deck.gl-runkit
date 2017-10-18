import * as deckglCore from 'deck.gl-core';
import * as deckglLayers from 'deck.gl-layers';

const win = typeof window === undefined ? global : window;
const doc = win.document;

const CANVAS_STYLE = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
};

const DEFAULT_OPTIONS = {
  mapbox: win.mapboxgl
};

class DeckGL {

  constructor(container, props, opts = DEFAULT_OPTIONS) {
    if (!doc) {
      // Not browser
      return;
    }

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

    this._map = opts.mapbox && new opts.mapbox.Map({
      container: mapCanvas,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [props.longitude, props.latitude],
      zoom: props.zoom,
      pitch: props.pitch || 0,
      bearing: props.bearing || 0,
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
      onViewportChange: viewport => this.setProps(viewport)
    }));

    this._resize = this._resize.bind(this);
    window.addEventListener('resize', this._resize);

    this._container = container;
  }

  destroy() {
    if (this._map) {
      this._map.remove();
    }
    window.removeEventListener('resize', this._resize);
  }

  setProps(props) {
    this._deck.setProps(Object.assign({
      // Hack: deckgl does not update without changing `layers` array
      layers: this._deck.props.layers.slice(0)          
    }, props));

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
