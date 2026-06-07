import Button from "../Button/Button";
import "./FeedbackModal.css";

function FeedbackModal({
  isOpen,
  type = "info",
  title,
  message,
  confirmLabel = "Aceptar",
  cancelLabel = "Cancelar",
  loading = false,
  showCancel = true,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="feedback-modal-backdrop" role="presentation">
      <section
        className={`feedback-modal feedback-modal-${type}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        <div className="feedback-modal-content">
          <h2 id="feedback-modal-title">{title}</h2>

          {message && <p>{message}</p>}
        </div>

        <div className="feedback-modal-actions">
          {showCancel && (
            <Button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
          )}

          <Button type="button" onClick={onConfirm} disabled={loading}>
            {loading ? "Procesando..." : confirmLabel}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default FeedbackModal;