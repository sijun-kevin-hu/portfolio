import { render, screen } from '@testing-library/react';
import App from './App';

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  })),
});

test('renders Kevin Hu heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { level: 1, name: /kevin hu/i });
  expect(heading).toBeInTheDocument();
});
