import type { FC } from 'react';
import type { ValidationSectionId } from '../sections';

interface SectionStepperProps {
  sections: ReadonlyArray<{ id: ValidationSectionId; label: string }>;
  activeIndex: number;
}

const SectionStepper: FC<SectionStepperProps> = ({ sections, activeIndex }) => (
  <div className="fit-validator__section-stepper">
    {sections.map((section, index) => (
      <div
        key={section.id}
        className={
          index === activeIndex
            ? 'fit-validator__section-chip fit-validator__section-chip--active'
            : 'fit-validator__section-chip'
        }
        aria-current={index === activeIndex}
      >
        <span>{section.label}</span>
      </div>
    ))}
  </div>
);

export default SectionStepper;
