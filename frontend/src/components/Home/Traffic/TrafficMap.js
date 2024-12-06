import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { LineLayer } from '@deck.gl/layers';
import { DeckGlOverlay } from './deckgl-overlay';


const TrafficMap = () => {
  const [data, setData] = useState(null);


  return (
    <div>
  <APIProvider
        apiKey={""}
        libraries={["marker"]}
      >
        <Map
          mapId={""}
          style={{ width: "100vw", height: "80vh" }}
          defaultCenter={{ lat: 37.33548, lng: -121.893028 }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI
          >
      </Map>
    </APIProvider>
     </div>
  );
};



export default TrafficMap;
