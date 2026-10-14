import { act, fireEvent, render, screen } from '@testing-library/react';
import Affiliations from './Affiliations';

jest.mock('../hooks/useMediaQuery', () => ({ useMediaQuery: () => false }));

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 1200, left: 0 });
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const advance = () => act(() => jest.advanceTimersByTime(160));

test('hovering the logo strip keeps automatic scrolling running', () => {
  const { container } = render(<Affiliations />);
  const strip = container.querySelector('.affiliations-viewport');
  fireEvent.mouseEnter(screen.getByRole('region'));
  advance();
  expect(strip.scrollLeft).toBeGreaterThan(0);
  fireEvent.mouseEnter(strip);
  const beforeHover = strip.scrollLeft;
  advance();
  expect(strip.scrollLeft).toBeGreaterThan(beforeHover);
  fireEvent.mouseLeave(strip);
  advance();
  expect(strip.scrollLeft).toBeGreaterThan(beforeHover);
});

test('Play resumes even while its button retains focus and hover', () => {
  const { container } = render(<Affiliations />);
  const strip = container.querySelector('.affiliations-viewport');
  const pause = screen.getByRole('button', { name: 'Pause affiliation carousel' });
  fireEvent.focus(pause);
  fireEvent.mouseEnter(pause);
  fireEvent.click(pause);
  advance();
  expect(strip.scrollLeft).toBe(0);
  fireEvent.click(screen.getByRole('button', { name: 'Play affiliation carousel' }));
  advance();
  expect(strip.scrollLeft).toBeGreaterThan(0);
});
