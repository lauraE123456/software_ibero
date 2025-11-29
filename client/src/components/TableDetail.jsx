import React from "react";

const TableDetail = ({ register, editEmployee, deleteEmployee }) => {
  return (
    <div>
      {register.length > 0 /* Solo mostramos la tabla si hay registros */ && (
        <div className="tabla-container">
          {/* Contenedor para estilos de la tabla */}
          <table className="tabla-registros">
            {/* Tabla de empleados */}
            <thead>
              {/* Cabecera de la tabla */}
              <tr>
                {/* Fila de encabezados */}
                <th>Nombre</th>
                {/* Columna: Nombre */}
                <th>Edad</th>
                {/* Columna: Edad */}
                <th>País</th>
                {/* Columna: País */}
                <th>Cargo</th>
                {/* Columna: Cargo */}
                <th>Años</th>
                {/* Columna: Años de experiencia */}
                <th>Acciones</th>
                {/* Columna: Botones de acción */}
              </tr>
            </thead>
            <tbody>
              {/* Cuerpo de la tabla */}
              {register.map(
                (reg, index /* Recorremos cada registro con su índice */) => (
                  <tr key={index}>
                    {/* Fila por empleado (key = índice) */}
                    <td>{reg.name}</td>
                    {/* Celda: nombre del empleado */}
                    <td>{reg.age}</td>
                    {/* Celda: edad del empleado */}
                    <td>{reg.country}</td>
                    {/* Celda: país del empleado */}
                    <td>{reg.role}</td>
                    {/* Celda: cargo del empleado */}
                    <td>{reg.years}</td>
                    {/* Celda: años de experiencia */}
                    <td>
                      {/* Celda: acciones */}
                      <button
                        className="btn-editar" /* Clase CSS para estilos */
                        onClick={() =>
                          editEmployee(index)
                        } /* Al hacer clic, cargamos los datos en el formulario */
                      >
                        Editar
                      </button>
                      <button
                        className="btn-eliminar" /* Clase CSS para estilos */
                        onClick={() =>
                          deleteEmployee(index)
                        } /* Al hacer clic, eliminamos el registro */
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableDetail;
