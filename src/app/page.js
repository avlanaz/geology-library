"use client"

import Image from 'next/image'
import React from "react"
import useSWR from 'swr'
import 'ol/ol.css'

import { Map, View, Feature, Overlay } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {fromLonLat} from 'ol/proj';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Point } from 'ol/geom'

export default function Home() {
  const map = React.useRef(null)
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const { data, error, isLoading } = useSWR('/api/data/countries.json', fetcher)

  let layer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([4.35247, 50.84673]))
        })
      ]
    })
  })

  let overlay = new Overlay({
    autoPan: true,
  })

  React.useEffect( () => {
    map.current = new Map({
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });
    
    map.current.addLayer(layer)

    map.current.addOverlay(overlay)

    map.current.on('singleclick', (e) => {
      if (map.current.hasFeatureAtPixel(e.pixel)) {
        let coord = e.coordinate;
  
        console.log("Hello!")
      }
    })
  }, [map, data] )

  return (
    <main className="relative">
      <Image src="/data/next.svg" alt="me" width="64" height="64" />
      Home
      {isLoading &&
        <div>Loading</div>
      }

      {!isLoading &&
        <div id="map-container" className=' w-full h-[700px]'></div>
      }
      
    </main>
  )
}
