import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectDelay from '../../components/user/SelectDelay';

describe('SelectDelay', () => {
  it('renders delay button', () => {
    render(<SelectDelay onChange={() => {}} />);
    expect(screen.getByText('DELAY')).toBeInTheDocument();
  });
  it('shows options on click', () => {
    render(<SelectDelay onChange={() => {}} />);
    fireEvent.click(screen.getByText('DELAY'));
    expect(screen.getByText('3s Delay')).toBeInTheDocument();
    expect(screen.getByText('5s Delay')).toBeInTheDocument();
    expect(screen.getByText('10s Delay')).toBeInTheDocument();
  });
  it('calls onChange with selected value', () => {
    const onChange = vi.fn();
    render(<SelectDelay onChange={onChange} />);
    fireEvent.click(screen.getByText('DELAY'));
    fireEvent.click(screen.getByText('5s Delay'));
    expect(onChange).toHaveBeenCalledWith(5);
  });
});
