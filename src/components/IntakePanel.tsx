import { Building2, ClipboardCheck, Home, UserCheck } from 'lucide-react';
import { concernOptions, existingSecurityOptions } from '../data/intakeOptions';
import type { Budget, Concern, Intake, PropertyType } from '../types';

type IntakePanelProps = {
  intake: Intake;
  onChange: <K extends keyof Intake>(key: K, value: Intake[K]) => void;
};

const toggleListValue = <T extends string>(list: T[], value: T) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const toggleSecurityControl = (list: string[], value: string) => {
  if (value === 'None') return list.includes('None') ? [] : ['None'];

  return toggleListValue(
    list.filter((item) => item !== 'None'),
    value,
  );
};

const toggleConcern = (list: Concern[], value: Concern): Concern[] => {
  if (value === 'unknown') return list.includes('unknown') ? [] : ['unknown'];

  return toggleListValue<Concern>(
    list.filter((item) => item !== 'unknown'),
    value,
  );
};

export function IntakePanel({ intake, onChange }: IntakePanelProps) {
  return (
    <aside className="sidebar">
      <div className="section-heading">
        <ClipboardCheck size={20} />
        <h2>Intake</h2>
      </div>

      <label className="field">
        Assessment mode
        <div className="segmented">
          <button
            className={intake.mode === 'owner' ? 'active' : ''}
            onClick={() => onChange('mode', 'owner')}
            type="button"
          >
            <Home size={16} />
            Owner
          </button>
          <button
            className={intake.mode === 'buyer' ? 'active' : ''}
            onClick={() => onChange('mode', 'buyer')}
            type="button"
          >
            <Building2 size={16} />
            Buyer
          </button>
        </div>
      </label>

      <label className="field">
        Property type
        <select
          value={intake.propertyType}
          onChange={(event) => onChange('propertyType', event.target.value as PropertyType)}
        >
          <option value="">Not provided</option>
          <option value="single-family">Single-family</option>
          <option value="townhouse">Townhouse</option>
          <option value="condo">Condo</option>
          <option value="multi-family">Multi-family</option>
        </select>
      </label>

      <label className="toggle">
        <input
          checked={intake.addressKnown}
          onChange={(event) => onChange('addressKnown', event.target.checked)}
          type="checkbox"
        />
        <span>Address/context provided</span>
      </label>

      <label className="field">
        Occupancy notes
        <input
          onChange={(event) => onChange('occupants', event.target.value)}
          placeholder="Optional"
          value={intake.occupants}
        />
      </label>

      <div className="field">
        Existing controls
        <div className="chips">
          {existingSecurityOptions.map((option) => (
            <button
              className={intake.existingSecurity.includes(option) ? 'chip selected' : 'chip'}
              key={option}
              onClick={() => onChange('existingSecurity', toggleSecurityControl(intake.existingSecurity, option))}
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        Main concerns
        <div className="chips">
          {concernOptions.map((option) => (
            <button
              className={intake.concerns.includes(option.value) ? 'chip selected' : 'chip'}
              key={option.value}
              onClick={() => onChange('concerns', toggleConcern(intake.concerns, option.value))}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <label className="field">
        Improvement budget
        <select value={intake.budget} onChange={(event) => onChange('budget', event.target.value as Budget)}>
          <option value="unknown">Not sure</option>
          <option value="under-250">Under $250</option>
          <option value="250-1000">$250-$1,000</option>
          <option value="1000-5000">$1,000-$5,000</option>
          <option value="5000-plus">$5,000+</option>
        </select>
      </label>

      <label className="review-toggle">
        <input
          checked={intake.humanReview}
          onChange={(event) => onChange('humanReview', event.target.checked)}
          type="checkbox"
        />
        <UserCheck size={18} />
        Human adversarial review
      </label>
    </aside>
  );
}
