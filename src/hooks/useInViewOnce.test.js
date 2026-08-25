import { render, screen } from '@testing-library/react';
import { useInViewOnce } from './useInViewOnce';

const RevealTarget = ({ show }) => {
  const [ref, inView] = useInViewOnce();

  return (
    <div>
      {show ? <div ref={ref} data-testid="reveal-target" /> : null}
      <output>{String(inView)}</output>
    </div>
  );
};

test('observes a target that mounts after the hook', () => {
  const observe = jest.fn();
  const disconnect = jest.fn();

  global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }

    observe(node) {
      observe(node);
    }

    disconnect() {
      disconnect();
    }
  };

  const { rerender } = render(<RevealTarget show={false} />);
  expect(screen.getByText('false')).toBeInTheDocument();
  expect(observe).not.toHaveBeenCalled();

  rerender(<RevealTarget show />);

  expect(observe).toHaveBeenCalledWith(screen.getByTestId('reveal-target'));
  expect(disconnect).not.toHaveBeenCalled();
});
