import type { ChangeEvent, FC } from 'react';
import type { SentimentResponses, SentimentErrors } from '../types';

interface SentimentStepProps {
  responses: SentimentResponses;
  errors: SentimentErrors;
  onChange: (field: keyof SentimentResponses, value: string) => void;
}

const SentimentStep: FC<SentimentStepProps> = ({ responses, errors, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('npsScore', event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pmf-sentiment-nps">
        <span>
          1. What is your Net Promoter Score (NPS)?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__nps-control">
          <input
            id="pmf-sentiment-nps"
            type="range"
            min={0}
            max={100}
            step={1}
            value={responses.npsScore}
            onChange={handleChange}
            className="fit-validator__slider"
          />
          <output htmlFor="pmf-sentiment-nps" className="fit-validator__nps-value">
            {responses.npsScore}%
          </output>
        </div>
      </label>
      {errors.npsScore && (
        <p className="fit-validator__error" role="alert">
          {errors.npsScore}
        </p>
      )}
    </div>
  );
};

export default SentimentStep;
