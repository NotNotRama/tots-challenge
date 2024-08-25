import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './search-bar';
import { describe, it, expect, vi } from 'vitest';

describe('SearchBar', () => {
  it('renders correctly', () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(
      screen.getByPlaceholderText('Search by name, region, or ISO code')
    ).toBeInTheDocument();
  });

  it('calls onSearch when input changes', () => {
    const mockOnSearch = vi.fn();
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(
      'Search by name, region, or ISO code'
    );
    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
