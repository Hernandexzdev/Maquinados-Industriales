import { conexion } from "../db/mysql.js";
import Swal from "sweetalert2";
import bcryptjs from "bcryptjs";

export const login = async(req, res)=>{
    req.body.usuario
    req.body.contrasenia
    const data = req.body;
    let contraseniahash = await bcryptjs.hash(data.contrasenia, 8);
    if (data.usuario && data.contrasenia) {
        conexion.query('SELECT * FROM usuario WHERE nombreUsuario = ? && contrasenia = ?', [data.usuario, data.contrasenia], async(error, results) =>{
            if (results.length == 0 || !(await bcryptjs.compare(data.contrasenia, results[0]).contrasenia)) {
               const error = Swal.fire({
                    title: 'Error',
                    text: 'Usuario Y/O contraseña',
                    icon: "warning"
                })
                res.status(404).render('login', {error: error});
            }
            const correcto = Swal.fire({
                title: `Bienvenido ${data.usuario}`,
                text: 'Usuario Y/O contraseña',
                icon: "success",
                timer: 2000
            })
            res.status(200).render('menu', {correcto: correcto});
        })
    }
}