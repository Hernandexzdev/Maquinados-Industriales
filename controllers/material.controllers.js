import { conexion } from "../db/mysql.js";

export const obtenerMateriales = (req, res) =>{
    conexion.query('SELECT * FROM v_materiales', (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).render('material', {tituloweb: 'Registros de Materiales', materiales: results});
    })
}

export const obtenerMaterial = (req, res) =>{
    const id = req.params.id;
    conexion.query('SELECT * FROM v_material WHERE idMaterial = ?', [id], (error, result) =>{
        if (error) {
            throw error
        }else{
            res.render('material_editar', {tituloweb: 'Obtener Registro', material : result[0]});
        }
    })
}

export const actualizarMaterial = (req, res) =>{
    const id = req.params.id;
    var {fecha_Solicitud, fecha_Promesa, fecha_Entrega, fecha_Prorroga} = req.body;
    if (fecha_Prorroga == '') {
        const fecha_default = '0000-00-00'
        fecha_Prorroga = fecha_default;
    }
    conexion.query('UPDATE material SET fecha_Solicitud = IFNULL(?, fecha_Solicitud), fecha_Promesa = IFNULL(?, fecha_Promesa), fecha_Entrega = IFNULL(?, fecha_Entrega), fecha_Prorroga = IFNULL(?, fecha_Prorroga) WHERE idMaterial = ?', [fecha_Solicitud, fecha_Promesa, fecha_Entrega, fecha_Prorroga, id], (error, results) =>{
        if (error) {
            throw error
        }else{
             res.redirect('/api/material');
             res.end();
        }
    })
}