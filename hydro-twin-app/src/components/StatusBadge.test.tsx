import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders normal status with default label', () => {
    render(<StatusBadge status="normal" />);
    const badge = screen.getByText('Normal');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--normal');
  });

  it('renders warning status with default label', () => {
    render(<StatusBadge status="warning" />);
    const badge = screen.getByText('Peringatan');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--warning');
  });

  it('renders critical status with default label', () => {
    render(<StatusBadge status="critical" />);
    const badge = screen.getByText('Kritis');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--critical');
  });

  it('renders info status with default label', () => {
    render(<StatusBadge status="info" />);
    const badge = screen.getByText('Informasi');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--info');
  });

  it('renders demo status with default label', () => {
    render(<StatusBadge status="demo" />);
    const badge = screen.getByText('Demo');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--demo');
  });

  it('renders not_tested status with default label', () => {
    render(<StatusBadge status="not_tested" />);
    const badge = screen.getByText('Belum diuji');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--not-tested');
  });

  it('renders custom label when provided', () => {
    render(<StatusBadge status="normal" label="Custom Label" />);
    expect(screen.getByText('Custom Label')).toBeInTheDocument();
    expect(screen.queryByText('Normal')).not.toBeInTheDocument();
  });
});
