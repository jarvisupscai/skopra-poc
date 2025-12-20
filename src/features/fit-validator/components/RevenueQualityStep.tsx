import type { ChangeEvent, FC } from 'react';
import type {
  RevenueQualityResponses,
  RevenueQualityErrors,
} from '../types';

interface RevenueQualityStepProps {
  responses: RevenueQualityResponses;
  errors: RevenueQualityErrors;
  onChange: (field: keyof RevenueQualityResponses, value: string) => void;
}

const RevenueQualityStep: FC<RevenueQualityStepProps> = ({
  responses,
  errors,
  onChange,
}) => {
  const handleChange = (field: keyof RevenueQualityResponses) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(field, event.target.value);
    };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pmf-revenue-quality-arr">
        <span>
          1. What is your current Annual Recurring Revenue ($)?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-revenue-quality-arr"
          type="text"
          value={responses.currentArr}
          onChange={handleChange('currentArr')}
          className="fit-validator__input"
          placeholder="Enter current ARR"
          required
        />
      </label>
      {errors.currentArr && (
        <p className="fit-validator__error" role="alert">
          {errors.currentArr}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pmf-revenue-quality-top-two-acv">
        <span>
          2. What is the Annual Contract Value ($) of your top two biggest customers?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-revenue-quality-top-two-acv"
          type="text"
          value={responses.topTwoCustomersAcv}
          onChange={handleChange('topTwoCustomersAcv')}
          className="fit-validator__input"
          placeholder="Enter combined ACV of top two customers"
          required
        />
      </label>
      {errors.topTwoCustomersAcv && (
        <p className="fit-validator__error" role="alert">
          {errors.topTwoCustomersAcv}
        </p>
      )}
    </div>
  );
};

export default RevenueQualityStep;
