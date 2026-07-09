import { render, screen } from '@testing-library/react';
import { DataSourceBadge } from './DataSourceBadge';

describe('DataSourceBadge', () => {
  it('renders simulation badge', () => {
    render(<DataSourceBadge source="simulation" />);
    const badge = screen.getByText('DATA SIMULASI');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--provenance', 'badge--provenance-simulation');
  });

  it('renders experiment badge', () => {
    render(<DataSourceBadge source="experiment" />);
    const badge = screen.getByText('DATA EKSPERIMEN');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--provenance', 'badge--provenance-experiment');
  });

  it('renders live badge', () => {
    render(<DataSourceBadge source="live" />);
    const badge = screen.getByText('DATA LIVE');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge', 'badge--provenance', 'badge--provenance-live');
  });

  it('applies md size class when specified', () => {
    render(<DataSourceBadge source="simulation" size="md" />);
    const badge = screen.getByText('DATA SIMULASI');
    expect(badge).toHaveClass('badge--md');
  });
});
