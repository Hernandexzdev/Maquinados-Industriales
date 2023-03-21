import { conexion } from "../db/mysql.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const obtenerEntregas = (req, res) => {
    conexion.query('SELECT * FROM v_entregas', (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).render('entrega', {tituloweb: 'Registros de Entregas', entregas: results});
    })
}

export const obtenerEntrega = (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT *  FROM v_entrega WHERE idEntrega = ?', [id], (error, results) => {
        if (error) {
            throw error
        }else{
            res.status(200).render('entrega_editar', {tituloweb: 'Obtener registro', entrega : results[0]});
        }
    })
}
export const actualizarEntrega = (req, res) => {

    const id = req.params.id;
    const {originalname, path} = req.file;
    const {nombre_ProyectoPA, fecha_Promesa, fecha_Entrega, estatus_Pago} = req.body;
    const data = req.body;

    conexion.query('UPDATE entrega SET nombre_ProyectoPA = IFNULL(?, nombre_ProyectoPA), fecha_Promesa = IFNULL(?, fecha_Promesa), fecha_Entrega = IFNULL(?, fecha_Entrega), factura = IFNULL(?, factura), ruta_Factura = IFNULL(?, ruta_Factura), estatus_Pago = IFNULL(?, estatus_Pago)  WHERE idEntrega = ?', [nombre_ProyectoPA , fecha_Promesa , fecha_Entrega , originalname , path, estatus_Pago , id], (error, results) => {
        if (error) {
            throw error
        }else{
             
             res.redirect('/api/entregas');
             res.end();
        }
        console.log(id);
        console.log(data);
    }) 
    
}

export const descarga = (req, res) =>{
    const nombre = req.params.factura;
    const ruta = path.join(__dirname, '../src/upload/facturas/' + nombre);
    res.download(ruta, nombre);
}