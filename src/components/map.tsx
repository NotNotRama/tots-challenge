import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GetCountriesQuery } from '../generated/graphql';
import countryCoordinates from '../../public/countryCoordinates.json';
import markerIconUrl from '../../public/marker.png';
import { useIsMobile } from '../hooks/useIsMobile';
import { MapCenter } from './map-center';

type MapProps = {
  filteredCountries: GetCountriesQuery['countries'];
};

const customIcon = new Icon({
  iconUrl: markerIconUrl.src,
  iconSize: [20, 20],
});

export function Map({ filteredCountries }: MapProps) {
  const isMobile = useIsMobile();

  return (
    <MapContainer
      center={[0, 0]}
      zoom={isMobile ? 3 : 2}
      className="h-screen w-full"
    >
      <MapCenter />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {filteredCountries.map((country) => {
        const coordinateInfo = countryCoordinates.find(
          (c) => c['ISO Code'] === country.code
        );

        if (coordinateInfo) {
          const position: LatLngExpression = [
            coordinateInfo.Latitude,
            coordinateInfo.Longitude,
          ];

          return (
            <Marker key={country.code} position={position} icon={customIcon}>
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold text-lg mb-2">{country.name}</h3>
                  <p>
                    <span className="font-semibold">Capital:</span>{' '}
                    {country.capital || 'N/A'}
                  </p>
                  <p>
                    <span className="font-semibold">Continent:</span>{' '}
                    {country.continent.name}
                  </p>
                  <p>
                    <span className="font-semibold">Languages:</span>{' '}
                    {country.languages.map((lang) => lang.name).join(', ')}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}
