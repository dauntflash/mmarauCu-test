
'use client';
import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

export default function GoogleMaps() {
	const mapRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
				version: 'quartely',
			});

			const { Map } = await loader.importLibrary('maps');

			const locationInMap = {
				lat:-1.0930681462614988, 
				lng:35.85775785314004,
			};

			// MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary;

			const options: google.maps.MapOptions = {
				center: locationInMap,
				zoom: 15,
				mapId: 'NEXT_MAPS_TUTS',
			};

			const map = new Map(mapRef.current as HTMLDivElement, options);

			// add the marker in the map
			new Marker({
				map: map,
				position: locationInMap,
			});
		};

		initializeMap();
	}, []);

	return <div className="h-[500px] w-90% rounded-lg m-6 bg-gray-100 flex justify-center items-center  " ref={mapRef} />;
}
