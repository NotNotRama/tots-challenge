import { useState, useEffect } from 'react';
import { useGetCountriesQuery, GetCountriesQuery } from '../generated/graphql';
import dynamic from 'next/dynamic';
import { SearchBar } from '../components/SearchBar';

const Map = dynamic(() => import('../components/Map').then((mod) => mod.Map), {
  ssr: false,
});

export default function Home() {
  const { data, loading, error } = useGetCountriesQuery();
  const [filteredCountries, setFilteredCountries] = useState<
    GetCountriesQuery['countries'] | null
  >(null);

  useEffect(() => {
    if (data && data.countries) {
      setFilteredCountries(data.countries);
    }
  }, [data]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center p-4 text-red-500">Error: {error.message}</p>
    );

  const handleSearch = (searchTerm: string) => {
    if (!data) return;

    const filtered = data.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.continent.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  console.log('filteredCountries', filteredCountries);

  return (
    <div className="relative">
      <SearchBar onSearch={handleSearch} />
      {data && <Map filteredCountries={filteredCountries || []} />}
    </div>
  );
}
