import { AlertTriangle, Camera, CheckCircle2, Upload } from 'lucide-react';
import type { EvidenceKey, EvidenceSlot } from '../types';

type EvidenceGridProps = {
  slots: EvidenceSlot[];
  onAddFiles: (key: EvidenceKey, files: FileList | null) => void;
  onClearSlot: (key: EvidenceKey) => void;
};

export function EvidenceGrid({ slots, onAddFiles, onClearSlot }: EvidenceGridProps) {
  return (
    <>
      <div className="section-heading">
        <Camera size={20} />
        <h2>Evidence</h2>
      </div>
      <div className="evidence-grid">
        {slots.map((slot) => (
          <article className={slot.files.length ? 'evidence-card filled' : 'evidence-card'} key={slot.key}>
            <div className="card-top">
              <div>
                <h3>{slot.label}</h3>
                <p>{slot.risk}</p>
              </div>
              {slot.files.length > 0 ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            </div>
            <p>{slot.why}</p>
            <div className="upload-row">
              <label className="upload-button">
                <Upload size={16} />
                Add photos
                <input
                  accept="image/*"
                  multiple
                  onChange={(event) => onAddFiles(slot.key, event.target.files)}
                  type="file"
                />
              </label>
              {slot.files.length > 0 && (
                <button className="quiet-button" onClick={() => onClearSlot(slot.key)} type="button">
                  Clear
                </button>
              )}
            </div>
            {slot.files.length > 0 && (
              <div className="file-list">
                {slot.files.slice(0, 3).map((file) => (
                  <span key={`${slot.key}-${file.name}`}>{file.name}</span>
                ))}
                {slot.files.length > 3 && <span>+{slot.files.length - 3} more</span>}
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
