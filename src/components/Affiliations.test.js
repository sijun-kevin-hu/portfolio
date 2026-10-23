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

test.each([0, 1])('pointer focus does not reposition logo group %i before a click', (groupIndex) => {
  const { container } = render(<Affiliations />);
  const strip = container.querySelector('.affiliations-viewport');
  const link = container.querySelectorAll('.affiliations-group')[groupIndex].querySelectorAll('a')[2];
  strip.scrollLeft = 350;
  strip.scrollTo = jest.fn();
  jest.spyOn(link, 'matches').mockReturnValue(false);
  fireEvent.focus(link);
  expect(strip.scrollTo).not.toHaveBeenCalled();
  expect(strip.scrollLeft).toBe(350);
  advance();
  expect(strip.scrollLeft).toBe(350);
});

test('keyboard focus still brings the focused logo into view', () => {
  const { container } = render(<Affiliations />);
  const strip = container.querySelector('.affiliations-viewport');
  const link = screen.getByRole('link', { name: 'Tyler Technologies' });
  strip.scrollLeft = 350;
  strip.scrollTo = jest.fn();
  jest.spyOn(link, 'matches').mockReturnValue(true);
  HTMLElement.prototype.getBoundingClientRect.mockImplementation(function () {
    return { width: 1200, left: this === link.parentElement ? 400 : 0 };
  });
  fireEvent.focus(link);
  expect(link.matches).toHaveBeenCalledWith(':focus-visible');
  expect(strip.scrollTo).toHaveBeenCalledWith({ left: 750, behavior: 'instant' });
});

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

test('does not remeasure layout on each animation frame', () => {
  render(<Affiliations />);
  const calls = HTMLElement.prototype.getBoundingClientRect.mock.calls.length;
  advance();
  advance();
  expect(HTMLElement.prototype.getBoundingClientRect).toHaveBeenCalledTimes(calls);
});

test('stops animation work when the carousel leaves the viewport', () => {
  let notify;
  const original = window.IntersectionObserver;
  window.IntersectionObserver = jest.fn((callback) => {
    notify = callback;
    return { observe: jest.fn(), disconnect: jest.fn() };
  });
  try {
    const { container } = render(<Affiliations />);
    const strip = container.querySelector('.affiliations-viewport');
    advance();
    act(() => notify([{ isIntersecting: false }]));
    const position = strip.scrollLeft;
    advance();
    expect(strip.scrollLeft).toBe(position);
    act(() => notify([{ isIntersecting: true }]));
    advance();
    expect(strip.scrollLeft).toBeGreaterThan(position);
  } finally {
    window.IntersectionObserver = original;
  }
});
