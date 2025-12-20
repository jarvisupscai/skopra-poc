import type { ChangeEvent, FC } from 'react';
import type { AcvErrors } from '../types';

interface AcvStepProps {
  value: string;
  errors: AcvErrors;
  onChange: (value: string) => void;
}

const AcvStep: FC<AcvStepProps> = ({ value, errors, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pcf-acv-current-value">
        <span>
          1. What is your current Average Contract Value ($)?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pcf-acv-current-value"
          type="text"
          value={value}
          onChange={handleChange}
          className="fit-validator__input"
          placeholder="Enter your ACV (e.g., 1000)"
          required
        />
      </label>
      {errors.currentAverageContractValue && (
        <p className="fit-validator__error" role="alert">
          {errors.currentAverageContractValue}
        </p>
      )}
    </div>
  );
};

export default AcvStep;
