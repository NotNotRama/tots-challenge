import { useCenter } from '@/hooks/useCenter';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function MapCenter() {
  const { center } = useCenter();
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}
