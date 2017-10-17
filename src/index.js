import {render, getHTMLFromDeckGLProps} from './deckgl-viewer';

function createDummyLayer(layerName) {
  class DummyLayer {
    static get name() {
      return layerName;
    }

    constructor(props = {}) {
      this.props = props;
    }
  }
  DummyLayer.layerName = layerName;

  return DummyLayer;
}

/* Layers */
export const ArcLayer = createDummyLayer('ArcLayer');
export const IconLayer = createDummyLayer('IconLayer');
export const LineLayer = createDummyLayer('LineLayer');
export const PointCloudLayer = createDummyLayer('PointCloudLayer');
export const ScatterplotLayer = createDummyLayer('ScatterplotLayer');
export const ScreenGridLayer = createDummyLayer('ScreenGridLayer');
export const GridLayer = createDummyLayer('GridLayer');
export const GridCellLayer = createDummyLayer('GridCellLayer');
export const HexagonLayer = createDummyLayer('HexagonLayer');
export const HexagonCellLayer = createDummyLayer('HexagonCellLayer');
export const PathLayer = createDummyLayer('PathLayer');
export const PolygonLayer = createDummyLayer('PolygonLayer');
export const GeoJsonLayer = createDummyLayer('GeoJsonLayer');

/* Render functions */
export {
  render,
  getHTMLFromDeckGLProps
};
export const DeckGL = render;

/* Constants */
export {COORDINATE_SYSTEM} from 'deck.gl/dist/core/lib/constants';
