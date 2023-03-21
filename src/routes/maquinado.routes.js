import { Router } from "express";
import { obtenerMaquinados, obtenerMaquinado, actualizarMaquinado } from "../../controllers/maquinado.controllers.js";

const router = Router();

router.get('/maquinados', obtenerMaquinados);
router.get('/maquinado/:id', obtenerMaquinado);
router.post('/maquinado/:id', actualizarMaquinado)

export default router;