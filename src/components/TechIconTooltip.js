import { useId } from 'react';

const TechIconTooltip = ({ icon: TechIcon, label, compact = false }) => {
    const tooltipId = useId();

    return (
        <span
            className={`tech-tooltip ${compact ? 'tech-tooltip-compact' : ''}`}
            tabIndex={0}
            aria-label={`Technology: ${label}`}
            aria-describedby={tooltipId}
        >
            <TechIcon aria-hidden="true" focusable="false" />
            <span id={tooltipId} role="tooltip" className="tech-tooltip-label" translate="no">
                {label}
            </span>
        </span>
    );
};

export default TechIconTooltip;
