import Card from "../Card/Card";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./UserForm.css";

function UserForm({
  title,
  description,
  userData,
  loading = false,
  mode = "create",
  submitLabel = "Guardar",
  onChange,
  onSubmit,
  onCancel,
}) {
  const isEditMode = mode === "edit";

  return (
    <Card className="user-form-card">
      <form onSubmit={onSubmit}>
        <h2>{title}</h2>

        {description && <p>{description}</p>}

        <div className="user-form-grid">
          <label>
            Usuario
            <Input
              name="username"
              value={userData.username}
              onChange={onChange}
              placeholder="Usuario"
              required
            />
          </label>

          <label>
            Nombre
            <Input
              name="firstName"
              value={userData.firstName}
              onChange={onChange}
              placeholder="Nombre"
              required
            />
          </label>

          <label>
            Apellido
            <Input
              name="lastName"
              value={userData.lastName}
              onChange={onChange}
              placeholder="Apellido"
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
              placeholder="email@ejemplo.com"
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
              placeholder={
                isEditMode
                  ? "Dejar vacío para mantener la actual"
                  : "Contraseña"
              }
              required={!isEditMode}
            />
          </label>

          {isEditMode && typeof userData.active === "boolean" && (
            <label className="user-form-checkbox">
              <input
                type="checkbox"
                name="active"
                checked={userData.active}
                onChange={onChange}
              />
              Usuario activo
            </label>
          )}
        </div>

        <div className="user-form-actions">
          <Button type="button" className="btn-secondary" onClick={onCancel}>
            Cancelar
          </Button>

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Guardando..." : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default UserForm;