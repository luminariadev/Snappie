import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StartButton from '../../components/user/StartButton';

describe('StartButton', () => {
  it('renders START text', () => {
    render(<StartButton onClick={() => {}} />);
    expect(screen.getByText('START')).toBeInTheDocument();
  });
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<StartButton onClick={handleClick} />);
    fireEvent.click(screen.getByText('START'));
    expect(handleClick).toHaveBeenCalledOnce();
  });
  it('has correct aria-label', () => {
    render(<StartButton onClick={() => {}} />);
    expect(screen.getByLabelText('Mulai sesi photo booth')).toBeInTheDocument();
  });
});
