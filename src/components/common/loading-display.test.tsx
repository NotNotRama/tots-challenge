import { render, screen } from '@testing-library/react';
import { LoadingDisplay } from './loading-display';
import { describe, it, expect } from 'vitest';

describe('LoadingDisplay', () => {
  it('renders loading message', () => {
    render(<LoadingDisplay />);
    expect(screen.getByText('Loading countries...')).toBeInTheDocument();
  });
});
