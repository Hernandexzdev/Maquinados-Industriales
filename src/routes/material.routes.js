import { Router } from "express";
import { obtenerMateriales, obtenerMaterial, actualizarMaterial } from "../../controllers/material.controllers.js";

const router = Router();

router.get('/material', obtenerMateriales);
router.get('/material/:id', obtenerMaterial);
router.post('/material/:id', actualizarMaterial);

export default router;