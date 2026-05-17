import { useNavigate } from 'react-router-dom';

import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Logo from '../../components/Logo/Loco';

import './Login.css';

function Login() {
    const navigate = useNavigate();

    const fakeUser = {
        role: 'teacher',
    };

    const routesByRole = {
        admin: '/dashboard/admin',
        gab: '/dashboard/gabinete',
        teacher: '/dashboard/docente',
        student: '/dashboard/estudiante',
        direct: '/dashboard/directivo',
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const redirectPath = routesByRole[fakeUser.role];
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
                        required />

                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        required
                    />

                    <Button type='submit'>
                        Iniciar sesión
                    </Button>
                </form>
            </Card>
        </main>
    );
}

export default Login;