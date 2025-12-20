import type { ChangeEvent, FC, SyntheticEvent } from 'react';
import type { PcfResponses, PcfErrors } from '../types';

interface PersonaStepProps {
  responses: PcfResponses['persona'];
  errors: PcfErrors['persona'];
  onChange: (field: keyof PcfResponses['persona'], value: string) => void;
}

const PersonaStep: FC<PersonaStepProps> = ({ responses, errors, onChange }) => {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange('decisionMakers', event.target.value);
  };

  const handleChipClick = (
    event: SyntheticEvent<HTMLButtonElement>,
    field: 'knowsJobTitles' | 'canFindOnLinkedIn',
    value: 'yes' | 'no',
  ) => {
    event.preventDefault();
    onChange(field, value);
  };

  return (
    <div className="fit-validator__questions">
      <label className="fit-validator__field" htmlFor="pcf-persona-decision-makers">
        <span>
          1. Who are your ICP decision-makers?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <input
          id="pcf-persona-decision-makers"
          type="text"
          value={responses.decisionMakers}
          onChange={handleTextChange}
          className="fit-validator__input"
          placeholder="Describe the personas"
          required
        />
      </label>
      {errors.decisionMakers && (
        <p className="fit-validator__error" role="alert">
          {errors.decisionMakers}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pcf-persona-job-titles">
        <span>
          2. Do you know their exact job titles?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__chip-group" id="pcf-persona-job-titles">
          <button
            type="button"
            className={
              responses.knowsJobTitles === 'yes'
                ? 'fit-validator__chip fit-validator__chip--active'
                : 'fit-validator__chip'
            }
            onClick={(event) => handleChipClick(event, 'knowsJobTitles', 'yes')}
          >
            Yes
          </button>
          <button
            type="button"
            className={
              responses.knowsJobTitles === 'no'
                ? 'fit-validator__chip fit-validator__chip--active'
                : 'fit-validator__chip'
            }
            onClick={(event) => handleChipClick(event, 'knowsJobTitles', 'no')}
          >
            No
          </button>
        </div>
      </label>
      {errors.knowsJobTitles && (
        <p className="fit-validator__error" role="alert">
          {errors.knowsJobTitles}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="pcf-persona-linkedin">
        <span>
          3. Can you find 500-1000 such people using LinkedIn filters?{' '}
          <span className="fit-validator__required" aria-hidden="true">*</span>
        </span>
        <div className="fit-validator__chip-group" id="pcf-persona-linkedin">
          <button
            type="button"
            className={
              responses.canFindOnLinkedIn === 'yes'
                ? 'fit-validator__chip fit-validator__chip--active'
                : 'fit-validator__chip'
            }
            onClick={(event) => handleChipClick(event, 'canFindOnLinkedIn', 'yes')}
          >
            Yes
          </button>
          <button
            type="button"
            className={
              responses.canFindOnLinkedIn === 'no'
                ? 'fit-validator__chip fit-validator__chip--active'
                : 'fit-validator__chip'
            }
            onClick={(event) => handleChipClick(event, 'canFindOnLinkedIn', 'no')}
          >
            No
          </button>
        </div>
      </label>
      {errors.canFindOnLinkedIn && (
        <p className="fit-validator__error" role="alert">
          {errors.canFindOnLinkedIn}
        </p>
      )}
    </div>
  );
};

export default PersonaStep;
