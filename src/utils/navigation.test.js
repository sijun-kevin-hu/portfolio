import { scrollToSection } from './navigation';

test('centers a section header below the fixed navbar', () => {
  document.body.innerHTML = `
    <nav data-site-navbar></nav>
    <section id="projects" aria-labelledby="projects-heading">
      <div id="projects-header"><h2 id="projects-heading">Projects</h2></div>
    </section>
  `;

  const navbar = document.querySelector('[data-site-navbar]');
  const header = document.getElementById('projects-header');
  navbar.getBoundingClientRect = () => ({ height: 80 });
  header.getBoundingClientRect = () => ({ top: 600, height: 200 });
  Object.defineProperty(window, 'innerHeight', { configurable: true, value: 900 });
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 400 });
  window.scrollTo = jest.fn();
  const event = { preventDefault: jest.fn() };

  scrollToSection(event, '#projects');

  expect(event.preventDefault).toHaveBeenCalled();
  expect(window.scrollTo).toHaveBeenCalledWith({ top: 610, behavior: 'smooth' });
  expect(window.location.hash).toBe('#projects');
});
