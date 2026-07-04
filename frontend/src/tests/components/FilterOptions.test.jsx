import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterOptions from '../../components/user/FilterOptions';

describe('FilterOptions', () => {
  it('renders all filter options', () => {
    render(<FilterOptions selected="normal" onSelect={() => {}} />);
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('Monokrom')).toBeInTheDocument();
    expect(screen.getByText('Sepia')).toBeInTheDocument();
    expect(screen.getByText('Soft')).toBeInTheDocument();
    expect(screen.getByText('Pop Art')).toBeInTheDocument();
    expect(screen.getByText('Retro')).toBeInTheDocument();
  });
  it('highlights selected filter', () => {
    render(<FilterOptions selected="mono" onSelect={() => {}} />);
    expect(screen.getByText('Monokrom').closest('button')).toHaveAttribute('aria-pressed', 'true');
  });
  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<FilterOptions selected="normal" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Sepia'));
    expect(onSelect).toHaveBeenCalledWith('sepia');
  });
});
