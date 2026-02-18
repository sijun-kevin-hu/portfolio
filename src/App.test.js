import { render, screen } from '@testing-library/react';
import App from './App';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = jest.requireActual('react');
  const filteredProps = (props) => {
    const {
      initial, animate, exit, variants, transition,
      whileHover, whileTap, whileDrag, whileFocus,
      layout, layoutId,
      ...validProps
    } = props;
    return validProps;
  };

  const motion = new Proxy({}, {
    get: (_target, element) => ({ children, ...props }) => (
      React.createElement(typeof element === 'string' ? element : 'div', filteredProps(props), children)
    ),
  });

  return {
    motion,
    MotionConfig: ({ children }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useSpring: () => ({ get: () => 0 }),
    useTransform: () => ({ get: () => 0 }),
    useInView: () => true,
    useReducedMotion: () => false,
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
