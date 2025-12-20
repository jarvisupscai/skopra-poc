import type { ChangeEvent, FC } from 'react';
import type { PcfResponses, PcfErrors } from '../types';

interface ProblemUrgencyStepProps {
  responses: PcfResponses['problemUrgency'];
  errors: PcfErrors['problemUrgency'];
  onChange: (field: keyof PcfResponses['problemUrgency'], value: string) => void;
}

const ProblemUrgencyStep: FC<ProblemUrgencyStepProps> = ({
  responses,
  errors,
  onChange,
}) => {
  const handleChange = (field: keyof PcfResponses['problemUrgency']) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value.length <= 200) {
        onChange(field, event.target.value);
      }
    };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pcf-problem-trigger">
        <span>
          1. When prospects buy, what trigger or pain are they reacting to?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pcf-problem-trigger"
          type="text"
          maxLength={200}
          value={responses.decisionTrigger}
          onChange={handleChange('decisionTrigger')}
          className="fit-validator__input"
          placeholder="Describe the trigger or pain"
          required
        />
      </label>
      {errors.decisionTrigger && (
        <p className="fit-validator__error" role="alert">
          {errors.decisionTrigger}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pcf-problem-consequences">
        <span>
          2. What happens if they don't solve this problem for 6 months?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pcf-problem-consequences"
          type="text"
          maxLength={200}
          value={responses.consequences}
          onChange={handleChange('consequences')}
          className="fit-validator__input"
          placeholder="Describe the consequences"
          required
        />
      </label>
      {errors.consequences && (
        <p className="fit-validator__error" role="alert">
          {errors.consequences}
        </p>
      )}
    </div>
  );
};

export default ProblemUrgencyStep;
