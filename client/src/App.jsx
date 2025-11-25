//Importar useState y useEffect herramientas que nos brinda react
//useState permite guardar los datos en memoria
//useEffect permite ejecutar las funciones
import { useEffect, useState } from "react";
import "./App.css";

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
        const response = await fetch("http://localhost:3001/empleados");
        const data = await response.json(); //respuesta en formato json
        setRegister(data);
      } catch (error) {
        alert("Error al cargar los empleados", error);
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
          `http://localhost:3001/empleados/${employee.id}`,
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
          alert("Empleado actualizado correctamente");
        } else {
          alert("Error al actualizar el empleado");
        }
      } catch (error) {
        alert("Error de conexion al actualizar el empleado", error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3001/empleados", {
          method: "POST", //metodo http para actualizar,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age, country, role, years }),
        });
        const data = await response.json();
        if (response.ok) {
          setRegister([...register, data]);
          alert("Empleado guardado correctamente");
        } else {
          alert("Error al registar el usuario");
        }
      } catch (error) {
        alert("Error de conexion al registar el usuario", error);
      }
    }
    setName("");
    setAge(0);
    setCountry("");
    setRole("");
    setYears(0);
  };
  return <div></div>;
}

export default App;
