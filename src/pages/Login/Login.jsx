import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../data/mockUsers';

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
    const fakeUser = {
        role: 'gab',
    };

    const routesByRole = {
        admin: '/dashboard/admin',
        gab: '/dashboard/gabinete',
        teacher: '/dashboard/docente',
        student: '/dashboard/estudiante',
        direct: '/dashboard/directivo',
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

    const handleLogin = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = credentials.username.trim();
        const password = credentials.password;

        const user = mockUsers.find(
            (mockUser) =>
                mockUser.username === username &&
                mockUser.password === password &&
                mockUser.active
        );

        if (!user) {
            setError('Usuario o contraseña incorrectos');
            setCredentials((currentCredentials) => ({
                ...currentCredentials,
                password: '',
            }));
            return;
        }

        const sessionUser = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.key,
            roleName: user.role.name,
        };

        sessionStorage.setItem('aulia_user', JSON.stringify(sessionUser));
        const redirectPath = routesByRole[sessionUser.role] || '/login';
        navigate(redirectPath);
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

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <Button type='submit'>
                        Iniciar sesión
                    </Button>
                </form>
            </Card>
        </main>
    );
}

export default Login;