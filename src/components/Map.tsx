import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GetCountriesQuery } from '../generated/graphql';
import countryCoordinates from '../../public/countryCoordinates.json';
import markerIconUrl from '../../public/marker.png';

type MapProps = {
  countries: GetCountriesQuery['countries'];
};

const customIcon = new Icon({
  iconUrl: markerIconUrl.src,
  iconSize: [20, 20],
});

export function Map({ countries }: MapProps) {
  const center: LatLngExpression = [0, 0];

  return (
    <MapContainer center={center} zoom={2} className="h-screen w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countries.map((country) => {
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
