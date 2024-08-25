import { render, screen } from '@testing-library/react';
import { ErrorDisplay } from './error-display';
import { describe, it, expect } from 'vitest';

describe('ErrorDisplay', () => {
  it('renders error message when provided', () => {
    const errorMessage = 'Test error message';
    render(<ErrorDisplay message={errorMessage} />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders default message when no message is provided', () => {
    render(<ErrorDisplay />);
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(
      screen.getByText('No additional information available.')
    ).toBeInTheDocument();
  });
});
