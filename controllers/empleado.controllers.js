import { conexion } from "../db/mysql.js";

export const obtenerEmpleados = (req, res) =>{
    conexion.query('SELECT * FROM v_empleado', (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).render('empleado', {tituloweb: 'Registros de proyetos', empleados: results});
    })
}

