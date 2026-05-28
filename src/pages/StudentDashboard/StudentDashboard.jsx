import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import './StudentDashboard.css';
import Card from '../../components/Card/Card';
import Select from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/Button/Button";
import useStudentDashboard from "../../hooks/useStudentDashboard";

function StudentDashboard() {
    const {
        formData,
        emotionOptions,
        subjectOptions,
        handleEmotionSelect,
        handleSubjectChange,
        handleCommentChange,
        handleHelpRequestedChange,
        handleCancel,
        handleSubmit,
    } = useStudentDashboard();

    return (
        <DashboardLayout role="student">
            <section className="student-dashboard">
                <h1 className="student-dashboard-title">
                    ¿Cómo te sientís hoy?
                </h1>
                <h2 className="student-dashboard-subtitle">
                    Registrá cómo te sentís y, si querés, contanos un poco más.
                </h2>
                <Card className="emotion-options-container">
                    <form className="emotion-options-form" onSubmit={handleSubmit}>
                        <div className="emotion-options">
                            {emotionOptions.map((emotion) => (
                                <button
                                    key={emotion.value}
                                    type="button"
                                    className={`emotion-card ${formData.emotionalState === emotion.value
                                            ? "emotion-card-active"
                                            : ""
                                        }`}
                                    onClick={() => handleEmotionSelect(emotion.value)}
                                >
                                    <p>{emotion.emoji}</p> {emotion.label}
                                </button>
                            ))}
                        </div>
                        <p className="emotion-options-txt">Si te sentiste así en una materia en particular, seleccionala:</p>
                        <Select
                            className="select-subject"
                            id="subject"
                            name="subject"
                            options={subjectOptions}
                            value={formData.subject}
                            onChange={handleSubjectChange}
                        />
                        <p className="emotion-options-txt">¿Querés contarnos algo más?</p>
                        <textarea
                            className="coment-txt-area"
                            name="coment" id="coment"
                            placeholder="Escribí un comentario opcional..."
                            value={formData.comment}
                            onChange={handleCommentChange}></textarea>
                        <label className="checkbox-container emotion-options-txt">
                            <input type="checkbox" />
                            <span>Quiero que alguien del gabinete me contacte</span>
                        </label>
                        <div className="buttons-container">
                            <Button type="submit" className="btn-primary">
                                Guardar
                            </Button>
                            <Button
                                type="button"
                                className="btn-secondary"
                                onClick={handleCancel}>
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