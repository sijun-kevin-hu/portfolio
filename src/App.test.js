import { render, screen, within } from '@testing-library/react';
import App from './App';
import { projects } from './data/projects';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: jest.fn((query) => ({
    matches: typeof query === 'string' && (query.includes('max-width') || query.includes('pointer: coarse')),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock React.lazy and Suspense to render immediately
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    Suspense: ({ children }) => <>{children}</>,
    lazy: (factory) => {
      const Component = originalReact.lazy(factory);
      return (props) => (
        <originalReact.Suspense fallback={null}>
          <Component {...props} />
        </originalReact.Suspense>
      );
    },
  };
});

test('renders Sijun Kevin Hu text', async () => {
  window.matchMedia = () => ({
    matches: true,
    media: '(max-width: 767px), (pointer: coarse)',
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });

  render(<App />);
  // Use findByText because some content might be loaded lazily or animated
  const linkElement = await screen.findByText(/Sijun Kevin Hu/i);
  expect(linkElement).toBeInTheDocument();
});

test('keeps navigation targets mounted and orders proof before supporting context', async () => {
  render(<App />);

  await screen.findByRole('heading', { name: /Featured Projects/i });

  const projectsSection = screen.getByRole('region', { name: /Featured Projects/i });
  const aboutSection = screen.getByRole('region', { name: /About Me/i });
  const skillsSection = screen.getByRole('region', { name: /Tech Stack/i });
  const contactSection = screen.getByRole('region', { name: /Ready to start a project/i });

  expect(projectsSection).toBeInTheDocument();
  expect(aboutSection).toBeInTheDocument();
  expect(skillsSection).toBeInTheDocument();
  expect(contactSection).toBeInTheDocument();

  expect(projectsSection.compareDocumentPosition(aboutSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(aboutSection.compareDocumentPosition(skillsSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(skillsSection.compareDocumentPosition(contactSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test('matches the navigation to the page flow and keeps the hero action focused', async () => {
  render(<App />);

  const navigation = screen.getByRole('navigation');
  const navLinks = within(navigation).getAllByRole('link').filter((link) => (
    ['Projects', 'About', 'Skills'].includes(link.textContent.trim())
  ));

  expect(navLinks.map((link) => link.textContent.trim())).toEqual(['Projects', 'About', 'Skills']);
  expect(screen.getByRole('link', { name: /Download Resume/i })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /View Projects/i })).not.toBeInTheDocument();
});

test('keeps a focused four-project featured collection without a secondary reveal', () => {
  expect(projects.filter((project) => project.featured).map((project) => project.title)).toEqual([
    'Break My House',
    'Clash Royale Matchup Predictor',
    'Tap Detail',
    'AdaLens',
  ]);
});
