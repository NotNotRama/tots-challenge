import { useState } from 'react';
import { Input } from './ui/input';

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  }

  return (
    <div className="absolute top-4 right-4 z-[1000]  p-2 ">
      <Input
        placeholder="Search by name, region, or ISO code"
        value={searchTerm}
        onChange={handleSearch}
        className="w-72"
      />
    </div>
  );
}
