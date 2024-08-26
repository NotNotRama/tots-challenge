import { type ClassValue, clsx } from 'clsx';
import { LatLngExpression } from 'leaflet';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const southAmericaCenter: LatLngExpression = [-14.235, -51.925];
export const worldCenter: LatLngExpression = [0, 0];
