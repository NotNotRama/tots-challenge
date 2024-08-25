import { GetCountriesQuery } from '@/generated/graphql';
import { useMemo } from 'react';

export function useFilteredCountries(
  countries: GetCountriesQuery['countries'] | undefined,
  searchTerm: string
) {
  return useMemo(() => {
    if (!countries) return [];

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.continent.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [countries, searchTerm]);
}
