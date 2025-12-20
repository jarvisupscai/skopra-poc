import type { ChangeEvent, FC } from 'react';
import type { UsageResponses, UsageErrors } from '../types';

interface UsageStepProps {
  responses: UsageResponses;
  errors: UsageErrors;
  customersStillPayingLabel: string;
  inputDisabled: boolean;
  onChange: (field: keyof UsageResponses, value: string) => void;
}

const UsageStep: FC<UsageStepProps> = ({
  responses,
  errors,
  customersStillPayingLabel,
  inputDisabled,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('weeklyActiveCustomers', event.target.value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pmf-usage-weekly-active-customers">
        <span>
          1. How many of the {customersStillPayingLabel} customers still paying use the product on a weekly basis?
        </span>
        <input
          id="pmf-usage-weekly-active-customers"
          type="text"
          value={responses.weeklyActiveCustomers}
          onChange={handleChange}
          className="fit-validator__input"
          placeholder="Enter the number of weekly users"
          disabled={inputDisabled}
        />
      </label>
      {errors.weeklyActiveCustomers && (
        <p className="fit-validator__error" role="alert">
          {errors.weeklyActiveCustomers}
        </p>
      )}
      {inputDisabled && (
        <p className="fit-validator__note">
          Provide the customers still paying value in Retention to unlock usage tracking.
        </p>
      )}
    </div>
  );
};

export default UsageStep;
