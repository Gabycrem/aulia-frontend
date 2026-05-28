import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import './StudentDashboard.css';
import Card from '../../components/Card/Card';
import Select from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/Button/Button";
/*
import { useState , useEffect  } from 'react';

import { saveCheckIn } from '../../services/checkInService';
*/

function StudentDashboard() {
    /*
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   

    const [formData, setFormData] = useState({
        emotionalState: '',
        context: '',
        comment: '',
        helpRequested: false,
    });

    
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setLoading(true);

            await saveCheckIn({
                ...formData,
                studentId: 1,
                courseId: 1,
            });

        } catch (error) {
            setError(error.message);

        } finally {
            setLoading(false);
        }
    }
    */
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
                    <div className="emotion-options">
                        <button className="emotion-card"><p>😊</p> Muy bien</button>
                        <button className="emotion-card"><p>🙂</p> Bien</button>
                        <button className="emotion-card"><p>😐</p> Normal</button>
                        <button className="emotion-card"><p>😢</p> Muy mal</button>
                        <button className="emotion-card"><p>😟</p> Mal</button>
                    </div>
                    <p className="emotion-options-txt">Si te sentiste así en una materia en particular, seleccionala:</p>
                    <Select
                        className="select-subject"
                        id="subject"
                        name="subject"
                        options={[
                            { value: 'matematica', label: 'Matemática' },
                            { value: 'lengua', label: 'Lengua' },
                            { value: 'historia', label: 'Historia' },
                            { value: 'fisica', label: 'Física' },
                        ]}
                    />
                    <p className="emotion-options-txt">¿Querés contarnos algo más?</p>
                    <textarea className="coment-txt-area" name="coment" id="coment" placeholder="Escribí un comentario opcional..."></textarea>
                    <label className="checkbox-container emotion-options-txt">
                        <input type="checkbox" />
                        <span>Quiero que alguien del gabinete me contacte</span>
                    </label>
                    <div className="buttons-container">
                        <Button className="btn-primary">
                            Guardar
                        </Button>
                        <Button className="btn-secondary">
                            Cancelar
                        </Button>
                    </div>
                </Card>
            </section>
        </DashboardLayout>
    );
}

export default StudentDashboard;