import { render, screen } from '@testing-library/react';
import TechIconTooltip from './TechIconTooltip';

const TestIcon = (props) => <svg viewBox="0 0 24 24" {...props} />;

test('names technology icons with a keyboard-accessible tooltip', () => {
    render(<TechIconTooltip icon={TestIcon} label="React" />);

    const trigger = screen.getByLabelText('Technology: React');
    const tooltip = screen.getByRole('tooltip');

    expect(tooltip).toHaveTextContent('React');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);

    trigger.focus();
    expect(trigger).toHaveFocus();
});
