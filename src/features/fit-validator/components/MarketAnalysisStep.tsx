import type { ChangeEvent, FC } from 'react';

import { MMF_QUESTIONS } from '../constants';
import type {
  MmfErrors,
  MmfResponses,
  MmfScaleChoice,
  MmfScaleResponse,
} from '../types';

interface MarketAnalysisStepProps {
  responses: MmfResponses;
  errors: MmfErrors;
  onChange: (field: keyof MmfResponses, value: MmfScaleResponse) => void;
}

const MarketAnalysisStep: FC<MarketAnalysisStepProps> = ({ responses, errors, onChange }) => {
  const handleChange = (
    field: keyof MmfResponses,
    event: ChangeEvent<HTMLSelectElement>,
  ) => {
    onChange(field, event.target.value as MmfScaleResponse);
  };

  return (
    <div className="fit-validator__questions">
      {MMF_QUESTIONS.map((question, index) => {
        const inputId = `mmf-${question.id}`;
        const fieldError = errors[question.id];

        return (
          <div key={question.id}>
            <label className="fit-validator__field" htmlFor={inputId}>
              <span>
                {`${index + 1}. ${question.title}`}{' '}
                <span className="fit-validator__required" aria-hidden="true">*</span>
              </span>
              <p className="fit-validator__note">{question.question}</p>
              <select
                id={inputId}
                value={responses[question.id]}
                onChange={(event) => handleChange(question.id, event)}
                className="fit-validator__input fit-validator__select"
                required
              >
                <option value="">Select an option</option>
                {(['1', '2', '3', '4', '5'] as MmfScaleChoice[]).map((choice) => (
                  <option key={choice} value={choice}>
                    {`${choice}) ${question.options[choice]}`}
                  </option>
                ))}
              </select>
            </label>
            {fieldError && (
              <p className="fit-validator__error" role="alert">
                {fieldError}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MarketAnalysisStep;
