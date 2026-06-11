import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Logo from '../../components/Logo/Loco';

import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');

    const routesByRole = {
        Admin: '/dashboard/admin',
        Gabinete: '/dashboard/gabinete',
        Docente: '/dashboard/docente',
        Alumno: '/dashboard/estudiante',
        Directivo: '/dashboard/directivo',
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCredentials((currentCredentials) => ({
            ...currentCredentials,
            [name]: value,
        }));

        if (error) {
            setError('');
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            setError("");
            const data = await login({
                username: credentials.username.trim(),
                password: credentials.password,
            });
            console.log("login response", data);
            if (!data.token) {
                throw new Error("No se recibió token de autenticación");
            }
            const sessionUser = {
                id: data.userId,
                userId: data.userId,
                email: data.email,
                role: data.role,
                token: data.token,
            };
            sessionStorage.setItem("aulia_user", JSON.stringify(sessionUser));
            console.log(
                "stored session user",
                JSON.parse(sessionStorage.getItem("aulia_user"))
            );

            const redirectPath = routesByRole[data.role] || "/login";

            navigate(redirectPath);
        } catch (error) {
            setError(error.message || "Usuario o contraseña incorrectos");
            setCredentials((currentCredentials) => ({
                ...currentCredentials,
                password: "",
            }));
        }
    };

    return (
        <main className="login-page">
            <Card className="login-card">
                <Logo className="login-logo" />

                <p className="login-text">
                    Ingresa tus credenciales para acceder a tu cuenta
                </p>

                <form className="login-form" onSubmit={handleLogin}>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Usuario"
                        value={credentials.username}
                        onChange={handleInputChange}
                        required />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                    />


                    <p className={`login-error ${error ? "login-error-visible" : ""}`}>
                        {error || " "}
                    </p>


                    <Button className='login-button' type='submit'>
                        Iniciar sesión
                    </Button>
                </form>
            </Card>
        </main>
    );
}

export default Login;