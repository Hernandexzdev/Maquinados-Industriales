import { Router } from "express";
import { obtenerEntregas, obtenerEntrega ,actualizarEntrega, descarga } from "../../controllers/entrega.controllers.js";
import { factura } from "../utils/handleFactura.js";
const router = Router();

router.get('/entregas', obtenerEntregas);
router.get('/entrega/:id', obtenerEntrega);
router.post('/entrega/:id', factura.single('factura'),actualizarEntrega);
router.get('/descarga/factura/:factura', descarga);



export default router;