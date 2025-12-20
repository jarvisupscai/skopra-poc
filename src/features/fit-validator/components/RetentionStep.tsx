import type { ChangeEvent, FC } from 'react';
import type {
  RetentionResponses,
  RetentionErrors,
} from '../types';

interface RetentionStepProps {
  responses: RetentionResponses;
  errors: RetentionErrors;
  reviewMonthLabel: string;
  onChange: (field: keyof RetentionResponses, value: string) => void;
}

const RetentionStep: FC<RetentionStepProps> = ({
  responses,
  errors,
  reviewMonthLabel,
  onChange,
}) => {
  const handleChange = (field: keyof RetentionResponses) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(field, event.target.value);
    };

  const customerCountDisplay = responses.customerCount.trim().length > 0
    ? responses.customerCount
    : '___';

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pmf-retention-customer-count">
        <span>
          1. How many customers did you close in <strong>{reviewMonthLabel}</strong>?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-retention-customer-count"
          type="text"
          value={responses.customerCount}
          onChange={handleChange('customerCount')}
          className="fit-validator__input"
          placeholder="Enter the number of customers"
          required
        />
      </label>
      {errors.customerCount && (
        <p className="fit-validator__error" role="alert">
          {errors.customerCount}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pmf-retention-total-contract-value">
        <span>
          2. What was the Total Contract Value ($) of the <strong>{customerCountDisplay}</strong> customers?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-retention-total-contract-value"
          type="text"
          value={responses.totalContractValue}
          onChange={handleChange('totalContractValue')}
          className="fit-validator__input"
          placeholder="Enter the TCV"
          required
        />
      </label>
      {errors.totalContractValue && (
        <p className="fit-validator__error" role="alert">
          {errors.totalContractValue}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pmf-retention-customers-paying">
        <span>
          3. How many of the <strong>{customerCountDisplay}</strong> customers are still paying you?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pmf-retention-customers-paying"
          type="text"
          value={responses.customersStillPaying}
          onChange={handleChange('customersStillPaying')}
          className="fit-validator__input"
          placeholder="Enter the number still paying"
          required
        />
      </label>
      {errors.customersStillPaying && (
        <p className="fit-validator__error" role="alert">
          {errors.customersStillPaying}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pmf-retention-min-ltv">
        <span>
          4. What is the minimum LTV (Life Time Value) of a customer?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <select
          id="pmf-retention-min-ltv"
          value={responses.minLtv}
          onChange={handleChange('minLtv')}
          className="fit-validator__input fit-validator__select"
          required
        >
          <option value="">Select LTV range</option>
          <option value="<2Months">&lt;2Months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value=">12 months">&gt;12 months</option>
        </select>
      </label>
      {errors.minLtv && (
        <p className="fit-validator__error" role="alert">
          {errors.minLtv}
        </p>
      )}
    </div>
  );
};

export default RetentionStep;
