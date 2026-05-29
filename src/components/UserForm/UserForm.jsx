import Card from "../Card/Card";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./UserForm.css";

function UserForm({
  title = "Datos de usuario",
  description = "Completá los datos de acceso.",
  userData,
  loading = false,
  submitLabel = "Continuar",
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <Card className="user-form-card">
      <form className="user-form" onSubmit={onSubmit}>
        <div className="user-form-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="user-form-grid">
          <label>
            Usuario
            <Input
              name="username"
              value={userData.username}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Nombre
            <Input
              name="firstName"
              value={userData.firstName}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Apellido
            <Input
              name="lastName"
              value={userData.lastName}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Email
            <Input
              type="email"
              name="email"
              value={userData.email}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Contraseña
            <Input
              type="password"
              name="password"
              value={userData.password}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div className="user-form-actions">
          <Button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Procesando..." : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UserForm;