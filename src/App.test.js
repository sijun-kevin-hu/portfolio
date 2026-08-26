import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { projects } from './data/projects';
import { technicalFrameworks, technicalLanguages, technicalTools } from './data/techStack';

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
  const skillsSection = screen.getByRole('region', { name: /How I Build/i });
  const contactSection = screen.getByRole('region', { name: /Ready to start a project/i });

  expect(projectsSection).toBeInTheDocument();
  expect(aboutSection).toBeInTheDocument();
  expect(skillsSection).toBeInTheDocument();
  expect(contactSection).toBeInTheDocument();

  expect(projectsSection.compareDocumentPosition(aboutSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(aboutSection.compareDocumentPosition(skillsSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(skillsSection.compareDocumentPosition(contactSection)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);

  expect(within(aboutSection).getByText(/turn ambiguous problems into software people can use/i)).toBeInTheDocument();
  expect(within(aboutSection).queryByText(/Let(?:'|’)s Connect/i)).not.toBeInTheDocument();
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
  const featuredProjects = projects.filter((project) => project.featured);

  expect(featuredProjects.map((project) => project.title)).toEqual([
    'Break My House',
    'Clash Royale Matchup Predictor',
    'Tap Detail',
    'AdaLens',
  ]);
  expect(featuredProjects.every((project) => project.visual?.src && project.visual?.alt)).toBe(true);
});

test('shows category filters as a unified project view', async () => {
  render(<App />);

  const projectsSection = await screen.findByRole('region', { name: /Featured Projects/i });
  const mobileFilter = within(projectsSection).getByRole('button', { name: /Filter projects by Mobile/i });

  fireEvent.click(mobileFilter);

  expect(mobileFilter).toHaveAttribute('aria-pressed', 'true');
  expect(within(projectsSection).getByRole('heading', { name: /Mobile Projects/i })).toBeInTheDocument();
  expect(within(projectsSection).getByRole('status')).toHaveTextContent('2 Mobile projects');
  expect(within(projectsSection).getByRole('heading', { name: 'Spotistats' })).toBeInTheDocument();
  expect(within(projectsSection).getByRole('heading', { name: 'Course Scheduler' })).toBeInTheDocument();
  expect(within(projectsSection).queryByText(/No featured projects found/i)).not.toBeInTheDocument();
  expect(within(projectsSection).queryByRole('heading', { name: /More Projects/i })).not.toBeInTheDocument();
});

test('presents skills by capability without dropping the existing stack', async () => {
  render(<App />);

  const skillsSection = await screen.findByRole('region', { name: /How I Build/i });
  const aiCard = within(skillsSection).getByRole('article', { name: /AI \/ ML Systems/i });
  const fullStackCard = within(skillsSection).getByRole('article', { name: /Full-Stack Products/i });
  const toolkit = within(skillsSection).getByRole('region', { name: /Engineering Toolkit/i });
  const additionalExperience = within(skillsSection).getByRole('region', { name: /Additional Experience/i });
  const existingSkills = [...technicalLanguages, ...technicalFrameworks, ...technicalTools];

  expect(within(fullStackCard).getByText('C#')).toBeInTheDocument();
  expect(within(fullStackCard).getByText('SQL')).toBeInTheDocument();
  expect(within(fullStackCard).getByText('Angular')).toBeInTheDocument();
  expect(within(aiCard).queryByText('SQL')).not.toBeInTheDocument();
  expect(within(toolkit).getByText('Firebase')).toBeInTheDocument();
  expect(within(additionalExperience).getByText('Express')).toBeInTheDocument();
  expect(within(additionalExperience).getByText('Flask')).toBeInTheDocument();
  existingSkills.forEach(({ name }) => {
    expect(within(skillsSection).getByText(name)).toBeInTheDocument();
  });

  expect(within(skillsSection).queryByRole('button', { name: /Filter skills/i })).not.toBeInTheDocument();
  expect(within(skillsSection).queryByText(/Sys\.Ver|Status: Online/i)).not.toBeInTheDocument();
});
