# deck.gl-runkit
Runkit value viewer using deck.gl

## Usage
```js
require('luma.gl');
require('react');
const {ScatterplotLayer} = require('deck.gl');

require("deck.gl-runkit").render({
  longitude: -122.45,
  latitude: 37.8,
  zoom: 12,
  map: true,
  layers: [
    new ScatterplotLayer({
      data: [
        {position: [-122.45, 37.8], color: [255, 0, 0], radius: 100}
      ]
    })
  ]
});
```

## Demo
[Notebook](https://runkit.com/pessimistress/deck-gl-playground#)
