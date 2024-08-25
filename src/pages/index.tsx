import { useState } from 'react';
import { useGetCountriesQuery, GetCountriesQuery } from '../generated/graphql';
import dynamic from 'next/dynamic';
import { SearchBar } from '@/components/search-bar';
import { useFilteredCountries } from '@/hooks/useFilteredCountries';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

const Map = dynamic(() => import('../components/map').then((mod) => mod.Map), {
  ssr: false,
});

export default function Home() {
  const { data, loading, error } = useGetCountriesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCountries = useFilteredCountries(data?.countries, searchTerm);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">Error: {error.message}</p>
    );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Map filteredCountries={filteredCountries} />
    </div>
  );
}
