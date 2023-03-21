import { Router } from "express";
import { obtenerPropuestas, obtenerPropuesta, actualizarPropuesta, descarga } from "../../controllers/desing.controllers.js";
import { propuesta} from "../utils/handlePropuesta.js";

const router = Router();

router.get('/desing', obtenerPropuestas); 
router.get('/desing/:id', obtenerPropuesta);
router.post('/desing/:id', propuesta.array('propuesta', 4), actualizarPropuesta);
router.get('/desing/descarga/:propuesta', descarga);


export default router;