import { useGetCountriesQuery } from '../generated/graphql';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map').then((mod) => mod.Map), {
  ssr: false,
});

export default function Home() {
  const { data, loading, error } = useGetCountriesQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{data && <Map countries={data.countries} />}</div>;
}
