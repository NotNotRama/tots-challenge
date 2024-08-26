import { useEffect, useState } from 'react';
import { useIsMobile } from './useIsMobile';
import { LatLngExpression } from 'leaflet';
import { southAmericaCenter, worldCenter } from '@/lib/utils';

export function useCenter() {
  const isMobile = useIsMobile();
  const [center, setCenter] = useState<LatLngExpression>([0, 0]);

  useEffect(() => {
    if (isMobile) {
      setCenter(southAmericaCenter);
    } else {
      setCenter(worldCenter);
    }
  }, [isMobile]);

  return { center };
}
