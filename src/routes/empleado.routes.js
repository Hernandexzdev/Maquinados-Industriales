import {Router} from "express";
import { obtenerEmpleados } from "../../controllers/empleado.controllers.js";
const router = Router();

router.get('/empleado', obtenerEmpleados);

export default router;