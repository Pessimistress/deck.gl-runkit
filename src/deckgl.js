import * as DeckGL from 'deck.gl-core';
import * as layers from 'deck.gl-layers';

const win = typeof window === undefined ? global : window;

win.DeckGL = Object.assign({}, DeckGL, layers);
