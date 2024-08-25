import { useState } from 'react';
import { useGetCountriesQuery } from '../generated/graphql';
import dynamic from 'next/dynamic';
import { SearchBar } from '@/components/search-bar';
import { useFilteredCountries } from '@/hooks/useFilteredCountries';
import { LoadingDisplay } from '@/components/common/loading-display';
import { ErrorDisplay } from '@/components/common/error-display';
import Head from 'next/head';

const Map = dynamic(() => import('../components/map').then((mod) => mod.Map), {
  ssr: false,
});

export default function Home() {
  const { data, loading, error } = useGetCountriesQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const filteredCountries = useFilteredCountries(data?.countries, searchTerm);

  if (loading) return <LoadingDisplay />;
  if (error) return <ErrorDisplay message={error.message} />;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Head>
        <title>My Map App</title>
        <meta
          name="tots challenge"
          content="A map app where you can set markers and filter markers"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SearchBar onSearch={handleSearch} />
      <Map filteredCountries={filteredCountries} />
    </div>
  );
}
