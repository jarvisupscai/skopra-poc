import type { ChangeEvent, FC } from 'react';
import type { MarketPullResponses, MarketPullErrors } from '../types';
import { MARKET_PULL_BASE_TOTAL } from '../constants';

interface MarketPullStepProps {
  responses: MarketPullResponses;
  errors: MarketPullErrors;
  onChange: (field: keyof MarketPullResponses, value: string) => void;
}

const MarketPullStep: FC<MarketPullStepProps> = ({
  responses,
  errors,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('inboundOpportunities', event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pmf-market-pull-inbound">
        <span>
          1. Of your last {MARKET_PULL_BASE_TOTAL} opportunities, how many arrived inbound or via referral?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-market-pull-inbound"
          type="number"
          min={0}
          max={MARKET_PULL_BASE_TOTAL}
          value={responses.inboundOpportunities}
          onChange={handleChange}
          className="fit-validator__input"
          placeholder="Enter inbound/referral opportunities"
          required
        />
      </label>
      {errors.inboundOpportunities && (
        <p className="fit-validator__error" role="alert">
          {errors.inboundOpportunities}
        </p>
      )}
    </div>
  );
};

export default MarketPullStep;
