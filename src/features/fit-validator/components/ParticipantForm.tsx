import type { FC, FormEvent } from "react";
import type {
  FitParticipant,
  ParticipantErrors,
  ParticipantField,
} from "../types";

interface ParticipantFormProps {
  participant: FitParticipant;
  errors: ParticipantErrors;
  onChange: (field: ParticipantField, value: string) => void;
  onStart: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const ParticipantForm: FC<ParticipantFormProps> = ({
  participant,
  errors,
  onChange,
  onStart,
  submitLabel = "Start PMF",
  isSubmitting = false,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onStart();
  };

  return (
    <form className="fit-validator__email" onSubmit={handleSubmit}>
      <label
        className="fit-validator__field"
        htmlFor="fit-validator-first-name"
      >
        <span>First name</span>
        <input
          id="fit-validator-first-name"
          type="text"
          maxLength={50}
          value={participant.firstName}
          onChange={(event) => onChange("firstName", event.target.value)}
          className="fit-validator__input"
          placeholder="Enter your first name"
          autoComplete="given-name"
          required
        />
      </label>
      {errors.firstName && (
        <p className="fit-validator__error" role="alert">
          {errors.firstName}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="fit-validator-last-name">
        <span>Last name</span>
        <input
          id="fit-validator-last-name"
          type="text"
          maxLength={50}
          value={participant.lastName}
          onChange={(event) => onChange("lastName", event.target.value)}
          className="fit-validator__input"
          placeholder="Enter your last name"
          autoComplete="family-name"
          required
        />
      </label>
      {errors.lastName && (
        <p className="fit-validator__error" role="alert">
          {errors.lastName}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="fit-validator-company">
        <span>Company name</span>
        <input
          id="fit-validator-company"
          type="text"
          maxLength={50}
          value={participant.company}
          onChange={(event) => onChange("company", event.target.value)}
          className="fit-validator__input"
          placeholder="Enter your company"
          autoComplete="organization"
          required
        />
      </label>
      {errors.company && (
        <p className="fit-validator__error" role="alert">
          {errors.company}
        </p>
      )}

      <label className="fit-validator__field" htmlFor="fit-validator-email">
        <span>Email address</span>
        <div className="fit-validator__email-row">
          <input
            id="fit-validator-email"
            type="email"
            maxLength={50}
            value={participant.email}
            onChange={(event) => onChange("email", event.target.value)}
            className="fit-validator__input"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : submitLabel}
          </button>
        </div>
      </label>
      {errors.email && (
        <p className="fit-validator__error" role="alert">
          {errors.email}
        </p>
      )}

      <p className="fit-validator__hint">
        We will use this to share the generated report later.
      </p>
    </form>
  );
};

export default ParticipantForm;
