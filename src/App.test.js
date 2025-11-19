import { render, screen } from '@testing-library/react';
import App from './App';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const filteredProps = (props) => {
    const {
      initial, animate, exit, variants, transition,
      whileHover, whileTap, whileDrag, whileFocus,
      layout, layoutId,
      ...validProps
    } = props;
    return validProps;
  };

  return {
    motion: {
      div: ({ children, ...props }) => <div {...filteredProps(props)}>{children}</div>,
      span: ({ children, ...props }) => <span {...filteredProps(props)}>{children}</span>,
      h1: ({ children, ...props }) => <h1 {...filteredProps(props)}>{children}</h1>,
      h2: ({ children, ...props }) => <h2 {...filteredProps(props)}>{children}</h2>,
      p: ({ children, ...props }) => <p {...filteredProps(props)}>{children}</p>,
      a: ({ children, ...props }) => <a {...filteredProps(props)}>{children}</a>,
      svg: ({ children, ...props }) => <svg {...filteredProps(props)}>{children}</svg>,
      path: ({ children, ...props }) => <path {...filteredProps(props)}>{children}</path>,
    },
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useSpring: () => ({ get: () => 0 }),
    useTransform: () => ({ get: () => 0 }),
    useInView: () => true,
    useAnimation: () => ({ start: () => Promise.resolve() }),
    useMotionValue: () => ({ set: () => {}, get: () => 0 }),
    useMotionTemplate: () => '',
    AnimatePresence: ({ children }) => <>{children}</>,
    lazy: (fn) => {
      const Component = fn();
      return (props) => <Component {...props} />;
    },
  };
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
  render(<App />);
  // Use findByText because some content might be loaded lazily or animated
  const linkElement = await screen.findByText(/Sijun Kevin Hu/i);
  expect(linkElement).toBeInTheDocument();
});
