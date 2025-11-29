//get,post,put,delete
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
PORT = 3001;
//route for get all employees
app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error al obtener los datos del empleado" });
    }
    return res.json(results);
  });
});

app.post("/employees", (req, res) => {
  const { name, age, country, role, years } = req.body;
  const sql =
    "INSERT INTO employees (name,age,country,role, years) VALUES (?,?,?,?,?)";
  db.query(sql, [name, age, country, role, years], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error al guardar los datos del empleado" });
    }
    return res.json({
      message: "empleado guardado correctamente",
      id: result.insertId,
      name,
      age,
      country,
      role,
      years,
    });
  });
});

app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, country, role, years } = req.body;
  const sql =
    "UPDATE employees SET name=?,age=?,country=?,role=?,years=? WHERE id=?";
  db.query(sql, [name, age, country, role, years, id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error al actualizar los datos del empleado" });
    }
    return res.json({
      message: "empleado actualizado correctamente",
    });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM employees WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "error al eliminar los datos del empleado" });
    }
    return res.json({
      message: "empleado eliminado correctamente",
    });
  });
});

app.listen(PORT, () => {
  console.log("Running server on Port 3001");
});
