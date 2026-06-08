import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import Card from "../../components/Card/Card";
import Select from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/Button/Button";
import useStudentDashboard from "../../hooks/useStudentDashboard";
import "./StudentDashboard.css";

function StudentDashboard() {
  const {
    formData,
    emotionOptions,
    contextOptions,
    loading,
    error,
    successMessage,
    handleEmotionSelect,
    handleContextChange,
    handleCommentChange,
    handleHelpRequestedChange,
    handleCancel,
    handleSubmit,
  } = useStudentDashboard();

  return (
    <DashboardLayout role="student">
      <section className="student-dashboard">
        <h2 className="student-dashboard-title">
          ¿Cómo te sentís hoy?
        </h2>

        <p className="student-dashboard-subtitle">
          Registrá cómo te sentís y, si querés, contanos un poco más.
        </p>

        <Card className="emotion-options-container">
          <form className="emotion-options-form" onSubmit={handleSubmit}>
            <div className="emotion-options">
              {emotionOptions.map((emotion) => (
                <button
                  key={emotion.value}
                  type="button"
                  className={`emotion-card ${
                    formData.emotionalState === emotion.value
                      ? "emotion-card-active"
                      : ""
                  }`}
                  onClick={() => handleEmotionSelect(emotion.value)}
                  disabled={loading}
                >
                  <p>{emotion.emoji}</p>
                  {emotion.label}
                </button>
              ))}
            </div>

            <p className="emotion-options-txt">
              Si querés, podés contarnos en qué contexto te sentiste así:
            </p>

            <Select
              className="select-subject"
              options={contextOptions}
              placeholder="Seleccionar contexto"
              value={formData.context?.value || ""}
              onChange={handleContextChange}
              disabled={loading}
            />

            <p className="emotion-options-txt">
              ¿Querés contarnos algo más?
            </p>

            <textarea
              className="coment-txt-area"
              name="comment"
              id="comment"
              placeholder="Escribí un comentario..."
              value={formData.comment}
              onChange={handleCommentChange}
              disabled={loading}
            />

            <label className="checkbox-container emotion-options-txt">
              <input
                type="checkbox"
                checked={formData.helpRequested}
                onChange={handleHelpRequestedChange}
                disabled={loading}
              />
              <span>Quiero que alguien del gabinete me contacte</span>
            </label>

            {error && <p className="student-dashboard-error">{error}</p>}

            {successMessage && (
              <p className="student-dashboard-success">{successMessage}</p>
            )}

            <div className="buttons-container">
              <Button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </Button>

              <Button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </DashboardLayout>
  );
}

export default StudentDashboard;