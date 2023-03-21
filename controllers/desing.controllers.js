import { conexion } from "../db/mysql.js";
import fs from "fs";
import { fileURLToPath } from "url";
import zip from "express-zip";
import archiver from "archiver";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const obtenerPropuestas = (req, res) =>{
    conexion.query('SELECT * FROM v_propuestas', (error, results) =>{
        if (error) {
            throw error
        }
        res.status(200).render('desing', {tituloweb: 'Registros de Diseños', propuestas: results});
    })
}

export const obtenerPropuesta = (req, res) =>{
    const id = req.params.id;
    conexion.query('SELECT * FROM v_propuesta WHERE idPropuesta = ?', [id], (error, results) =>{
        if (error) {
            throw error
        }else{
            res.render('desing_editar', {tituloweb: 'Obtener Registro', propuesta : results[0]});
            
        }
    })
}

export const actualizarPropuesta = (req, res) =>{
     const id = req.params.id;
     const propuesta = req.files[0].originalname;
     const ruta_Propuesta = req.files[0].path;
     const minuta = req.files[1].originalname;
     const ruta_Minuta = req.files[1].path;
     const documentosEx = req.files[2].originalname;
     const ruta_Documento = req.files[2].path;
     const evidencia = req.files[3].originalname;
     const ruta_Evidencia = req.files[3].path;
     const {propuesta_Estatus , nombre_ProyectoPR} = req.body;
    
     console.log(req.files);

     console.log(req.body);
            let archivo_Comprimido = `${nombre_ProyectoPR}.zip`;
            let output = fs.createWriteStream(path.join(__dirname, `../src/upload/propuestas/${nombre_ProyectoPR}.zip`));
            let archive = archiver('zip');
            archive.pipe(output);
            archive.append(fs.createReadStream(ruta_Propuesta),{name: 'documento1.pdf'});
            archive.append(fs.createReadStream(ruta_Minuta),{name: 'documento2.pdf'});
            archive.append(fs.createReadStream(ruta_Documento),{name: 'documento3.pdf'});
            archive.append(fs.createReadStream(ruta_Evidencia),{name: 'documento4.pdf'});
            archive.finalize();
            const archivo_zip = path.join(__dirname, `../src/upload/propuestas/${nombre_ProyectoPR}.zip`);
     conexion.query('UPDATE propuesta SET propuesta = ?, minuta = ?, documento_Complemetario = ?, evidencia_Aprobacion = ?, archivo_Comprimido = ?, ruta_zip = ?, propuesta_Estatus = ? WHERE idPropuesta = ?', [propuesta, minuta, documentosEx, evidencia, archivo_Comprimido, archivo_zip, propuesta_Estatus,  id], (error, results) =>{
        if (error) {
            throw error
          }else{
            

             res.redirect('/api/desing');
             res.end();
          }
     })



}

export const descarga = (req, res) =>{
     const nombre = req.params.propuesta;
     const ruta = path.join(__dirname, '../src/upload/propuestas/' + nombre);
     res.download(ruta, nombre)     
    
}

