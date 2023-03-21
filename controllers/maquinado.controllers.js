import { conexion } from "../db/mysql.js";

export const obtenerMaquinados = (req, res) =>{
    conexion.query('SELECT * FROM v_maquinados', (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).render('maquinado', {tituloweb: 'Registros de Materiales', maquinados: results});
    })
}

export const obtenerMaquinado = (req, res) =>{
    const id = req.params.id;
    conexion.query('SELECT * FROM v_maquinado WHERE idMaquinado = ?', [id], (error, results) =>{
        if (error) {
            throw error
        }else{
             res.status(200).render('maquinado_editar', {tituloweb: 'Obtener registro', maquinado : results[0]});
             
        }
    })
}

export const actualizarMaquinado = (req, res) => {
    const id = req.params.id;
    var {fecha_Solicitud, fecha_Promesa, fecha_Entrega, fecha_Prorroga, ubicacion, quien_Realizo, que_Realizo, observaciones} = req.body;
    const data = req.body;
    console.log(data);
    if (fecha_Prorroga == '') {
        const fecha_default = '0000-00-00'
        fecha_Prorroga = fecha_default;
    }
    conexion.query(' UPDATE maquinado SET fecha_Solicitud = IFNULL(?, fecha_Solicitud), fecha_Promesa = IFNULL(?, fecha_Promesa), fecha_Entrega = IFNULL(?, fecha_Entrega),fecha_Prorroga = IFNULL(?, fecha_Prorroga),ubicacion = IFNULL(?, ubicacion), quien_Realizo = IFNULL(?, quien_Realizo), que_Realizo = IFNULL(?, que_Realizo), observaciones = IFNULL(?, observaciones) WHERE idMaquinado = ?', [fecha_Solicitud, fecha_Promesa, fecha_Entrega, fecha_Prorroga, ubicacion, quien_Realizo, que_Realizo, observaciones, id], (error, results) =>{
        if (error) {
            throw error
        }else{
            res.redirect('/api/maquinados');
            res.end(); 
        }
    })
}