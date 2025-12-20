import type { ChangeEvent, FC } from 'react';
import type { CmfResponses, CmfErrors } from '../types';

interface GrossMarginStepProps {
  responses: CmfResponses['grossMargin'];
  errors: CmfErrors['grossMargin'];
  onChange: (field: keyof CmfResponses['grossMargin'], value: string) => void;
}

const GrossMarginStep: FC<GrossMarginStepProps> = ({ responses, errors, onChange }) => {
  const handlePercentChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('retainedRevenuePercent', event.target.value);
  };

  const handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('annualSalesCost', event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="cmf-retained-revenue">
        <span>
          1. After delivery costs, what % of revenue do you retain?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__input-affix">
          <input
            id="cmf-retained-revenue"
            type="number"
            min={0}
            max={100}
            value={responses.retainedRevenuePercent}
            onChange={handlePercentChange}
            className="fit-validator__input"
            placeholder="Enter percentage"
            required
          />
          <span className="fit-validator__input-suffix">%</span>
        </div>
      </label>
      {errors.retainedRevenuePercent && (
        <p className="fit-validator__error" role="alert">
          {errors.retainedRevenuePercent}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="cmf-annual-sales-cost">
        <span>
          2. What's the annual cost of an SDR/AE (salary + tools + overhead) in dollars ($)?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__input-affix">
          <span className="fit-validator__input-prefix">$</span>
          <input
            id="cmf-annual-sales-cost"
            type="number"
            min={0}
            value={responses.annualSalesCost}
            onChange={handleCostChange}
            className="fit-validator__input"
            placeholder="Enter annual cost ($)"
            required
          />
        </div>
      </label>
      {errors.annualSalesCost && (
        <p className="fit-validator__error" role="alert">
          {errors.annualSalesCost}
        </p>
      )}
    </div>
  );
};

export default GrossMarginStep;
