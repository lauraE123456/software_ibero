//Importar useState y useEffect herramientas que nos brinda react
//useState permite guardar los datos en memoria
//useEffect permite ejecutar las funciones
import { useEffect, useState } from "react";
import "./App.css";
import Swal from "sweetalert2";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [role, setRole] = useState(""); //Cargo
  const [years, setYears] = useState(0); //anos de experiencia

  // lista para almacenar todos los empleados
  const [register, setRegister] = useState([]);
  // estado para saber si estamos editando un empleado existente
  //si es null == newRegister o si tiene un valor es el indice del empleado
  const [editIndex, setEditIndex] = useState(null); // indice del registro que se esta editando

  //cuandop cargamos la pagina con useEffect
  useEffect(() => {
    //definimos una funcion asicrona, para cargar empleados
    const loadEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3001/employees");
        const data = await response.json(); //respuesta en formato json
        setRegister(data);
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error loading employees",
          showConfirmButton: false,
          timer: 1500,

          // 🎨 Colores personalizados
          background: "var(--color-card)",     // fondo de tarjeta
          color: "var(--color-text)",          // color del texto
          iconColor: "var(--color-primary)",   // color del ícono
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
          },
        });
        console.log("Error al cargar los empleados", error);
      }
    };
    loadEmployees();
  }, []);

  //esta funcion se ejecuta al presionar registar o actualizar
  const registerData = async (event) => {
    event.preventDefault(); //evitamos que se recarga la pagina del formulario
    if (editIndex !== null) {
      //editar un empleado existente
      try {
        const employee = register[editIndex];
        const response = await fetch(
          `http://localhost:3001/employees/${employee.id}`,
          {
            method: "PUT", //metodo http para actualizar,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, age, country, role, years }),
          }
        );
        if (response.ok) {
          const newRegister = [...register]; //copia del array
          //remplazamos el objeto en la posicion editada con los nuevos valores
          newRegister[editIndex] = {
            ...employee,
            name,
            age,
            country,
            role,
            years,
          };
          setEditIndex(null);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee updated successfully",
            showConfirmButton: false,
            timer: 1500,

            // 🎨 Colores personalizados
            background: "var(--color-card)",     // fondo de tarjeta
            color: "var(--color-text)",          // color del texto
            iconColor: "var(--color-primary)",   // color del ícono
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
            },
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error updating employee",
            showConfirmButton: false,
            timer: 1500,

            // 🎨 Colores personalizados
            background: "var(--color-card)",     // fondo de tarjeta
            color: "var(--color-text)",          // color del texto
            iconColor: "var(--color-primary)",   // color del ícono
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
            },
          });
        }
      } catch (error) {
        console.log("Error de conexion al actualizar el empleado", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/employees", {
          method: "POST", //metodo http para actualizar,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age, country, role, years }),
        });
        const data = await response.json();
        if (response.ok) {
          setRegister([...register, data]);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Employee saved successfully",
            showConfirmButton: false,
            timer: 1500,

            // 🎨 Colores personalizados
            background: "var(--color-card)",     // fondo de tarjeta
            color: "var(--color-text)",          // color del texto
            iconColor: "var(--color-primary)",   // color del ícono
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
            },
          });

        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error saving employee",
            showConfirmButton: false,
            timer: 1500,

            // 🎨 Colores personalizados
            background: "var(--color-card)",     // fondo de tarjeta
            color: "var(--color-text)",          // color del texto
            iconColor: "var(--color-primary)",   // color del ícono
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
            },
          });
        }
      } catch (error) {
        console.log("Error de conexion al registar el usuario", error);
      }
    }
    setName("");
    setAge(0);
    setCountry("");
    setRole("");
    setYears(0);
  };
  return (
    <div className="container">
      <div className="form-card">
        <div className="form-header">
          <h2>Registro de Empleados</h2>
          <p>Ingresa la información del nuevo integrante</p>
        </div>

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

          <button type="submit" className="submit-btn">
            {editIndex !== null ? "Actualizar Empleado" : "Registrar Empleado"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
