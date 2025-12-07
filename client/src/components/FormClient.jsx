import React from "react";

const FormClient = ({
  registerData,
  setName,
  setAge,
  setCountry,
  setRole,
  setYears,
  age,
  years,
  country,
  role,
  editIndex,
  name,
  email,
  setEmail,
  salary,
  setSalary,
}) => {
  return (
    <form onSubmit={registerData}>
      <div className="form-group">
        <label htmlFor="name">Nombre Completo</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Juan Pérez"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Edad</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="years">Años de Experiencia</label>
          <input
            type="number"
            id="years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="country">País</label>
        <input
          type="text"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Ej: Colombia"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Cargo</label>
        <input
          type="text"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Ej: Desarrollador Frontend"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="@gmail.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="years">Salario</label>
          <input
            type="number"
            id="salario"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="0"
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-btn" onClick={registerData}>
        {editIndex !== null ? "Actualizar Empleado" : "Registrar Empleado"}
      </button>
    </form>
  );
};

export default FormClient;
