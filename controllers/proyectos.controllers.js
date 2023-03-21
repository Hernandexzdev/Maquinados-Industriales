import { conexion } from "../db/mysql.js";

export const obtenerProyectos = (req, res) =>{
    conexion.query('SELECT * FROM v_proyectos', (error, results) =>{
        if (error) {
            throw error;
        }
        res.status(200).render('proyecto', {tituloweb: 'Registros de proyetos', proyectos: results});
    })
}
export const obtenerProyecto = (req, res) =>{
    const id = req.params.id
    conexion.query('SELECT * FROM v_proyecto WHERE idProyecto = ?', [id], (error, results) =>{
        if (error) {
            throw error;
        }
        res.status(200).render('proyecto_editar', {tituloweb: 'Obtener Registro', proyecto: results[0]});
        console.log(results[0]);
        res.end();
    })
}

export const actualizarProyecto = (req, res) =>{
    const id = req.params.id;
    const data = req.body;
    conexion.query('call actualizarproyecto(?,?,?,?,?,?,?,?,?,?)', [ data.nombre, data.vendedor, data.cliente, data.especificaciones, data.estatus_proyecto, id, id, id, id, id], (error, results) =>{
        if (error) {
            throw error
        }else{
            res.redirect('/api/proyectos');
            res.end();
        }
    })
    console.log(id);
    console.log(data);
}

export const registrarProyecto = (req, res, next) =>{
    const data = req.body;
    conexion.query("call insertarproyecto(?,?,?,?,?, @idPropuesta, @idMaterial, @idMaquinado, @idEntrega, @idProyecto)", [data.nombre, data.vendedor, data.cliente, data.especificaciones, data.estatus_proyecto], (error, results) =>{
        if(error){
            throw error
        }else{
            
           
            res.redirect('/api/proyectos');
            
            res.end();
           
        }
        
    })
}

export const eliminar = (req, res) =>{
    const id = req.params.id;
    const eliminar = 2;
    conexion.query('call eliminarproyecto(?, ?, ?, ?, ?, ?)', [eliminar, id, id, id, id, id], (error, results) =>{
        if (error) {
            throw error
        }else{
            res.redirect('/api/proyectos');
            res.end();
        }
    })
}