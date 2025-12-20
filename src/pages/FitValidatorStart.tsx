import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ParticipantForm from '../features/fit-validator/components/ParticipantForm';
import {
  INITIAL_PARTICIPANT,
  INITIAL_PARTICIPANT_ERRORS,
} from '../features/fit-validator/constants';
import {
  normalizeParticipant,
  validateParticipant,
} from '../features/fit-validator/validation';
import { saveParticipant } from '../features/fit-validator/api';
import { useFitValidator } from '../features/fit-validator/context/FitValidatorContext';
import type { FitParticipant, ParticipantErrors, ParticipantField } from '../features/fit-validator/types';

const FitValidatorStart: FC = () => {
  const navigate = useNavigate();
  const { participant, setParticipant } = useFitValidator();
  const [formValues, setFormValues] = useState<FitParticipant>(
    participant ?? INITIAL_PARTICIPANT,
  );
  const [errors, setErrors] = useState<ParticipantErrors>(INITIAL_PARTICIPANT_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: ParticipantField, value: string) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) =>
      current[field]
        ? {
            ...current,
            [field]: '',
          }
        : current,
    );
  };

  useEffect(() => {
    if (participant) {
      setFormValues(participant);
    }
  }, [participant]);

  const handleStart = async () => {
    const normalized = normalizeParticipant(formValues);
    const validation = validateParticipant(normalized);
    const hasErrors = Object.values(validation).some((message) => message.trim().length > 0);

    setErrors(validation);

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    try {
      const savedParticipant = await saveParticipant(normalized);
      setParticipant(savedParticipant);
      navigate('/fit-validator/validation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page fit-validator">
      <header className="fit-validator__intro">
        <h1>Start Fit Validation</h1>
        <p>
          Tell us who you are so we can tailor the validation experience and share the final report.
        </p>
      </header>

      <div className="fit-validator__panel">
        <ParticipantForm
          participant={formValues}
          errors={errors}
          onChange={handleChange}
          onStart={handleStart}
          submitLabel="Start"
          isSubmitting={isSubmitting}
        />
      </div>
    </section>
  );
};

export default FitValidatorStart;
