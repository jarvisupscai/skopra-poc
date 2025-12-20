import type { ChangeEvent, FC } from 'react';
import type { CmfResponses, CmfErrors } from '../types';

interface WinRateStepProps {
  responses: CmfResponses['winRate'];
  errors: CmfErrors['winRate'];
  onChange: (value: string) => void;
}

const WinRateStep: FC<WinRateStepProps> = ({ responses, errors, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="cmf-win-rate">
        <span>
          1. Out of 10 qualified opportunities, how many do you typically close?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="cmf-win-rate"
          type="number"
          min={0}
          max={10}
          value={responses.closesOutOfTen}
          onChange={handleChange}
          className="fit-validator__input"
          placeholder="Enter a number between 0 & 10"
          required
        />
      </label>
      {errors.closesOutOfTen && (
        <p className="fit-validator__error" role="alert">
          {errors.closesOutOfTen}
        </p>
      )}
    </div>
  );
};

export default WinRateStep;
