import type { ChangeEvent, FC } from 'react';
import type { CmfResponses, CmfErrors } from '../types';

const OPTIONS = [
  { value: 'lt1', label: '<1 month' },
  { value: '1-3', label: '1-3 months' },
  { value: '3-6', label: '3-6 months' },
  { value: 'gt6', label: '>6 months' },
];

interface SalesCycleStepProps {
  responses: CmfResponses['salesCycle'];
  errors: CmfErrors['salesCycle'];
  onChange: (value: CmfResponses['salesCycle']['typicalLength']) => void;
}

const SalesCycleStep: FC<SalesCycleStepProps> = ({ responses, errors, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as CmfResponses['salesCycle']['typicalLength']);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="cmf-sales-cycle">
        <span>
          1. How long does it usually take from first meeting to closed-won?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <select
          id="cmf-sales-cycle"
          value={responses.typicalLength}
          onChange={handleChange}
          className="fit-validator__input fit-validator__select"
          required
        >
          <option value="">Select duration</option>
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      {errors.typicalLength && (
        <p className="fit-validator__error" role="alert">
          {errors.typicalLength}
        </p>
      )}
    </div>
  );
};

export default SalesCycleStep;
