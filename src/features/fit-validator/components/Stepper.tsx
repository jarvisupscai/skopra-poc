import type { FC } from 'react';

interface StepperProps {
  steps: ReadonlyArray<{ id: string; label: string }>;
  activeIndex: number;
}

const Stepper: FC<StepperProps> = ({ steps, activeIndex }) => (
  <nav className="fit-validator__steps" aria-label="PMF steps">
    {steps.map((step, index) => {
      const isActive = index === activeIndex;

      return (
        <button
          key={step.id}
          type="button"
          className={
            isActive
              ? 'fit-validator__step fit-validator__step--active'
              : 'fit-validator__step'
          }
          disabled
          aria-disabled="true"
        >
          <span className="fit-validator__step-index">{index + 1}</span>
          <span>{step.label}</span>
        </button>
      );
    })}
  </nav>
);

export default Stepper;
