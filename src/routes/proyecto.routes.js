import { Router } from "express";
import { obtenerProyectos, registrarProyecto, obtenerProyecto, actualizarProyecto, eliminar } from "../../controllers/proyectos.controllers.js";

const router = Router();


router.get('/proyectos', obtenerProyectos);
router.get('/proyecto/:id', obtenerProyecto)
router.post('/proyecto', registrarProyecto);
router.post('/proyecto/:id', actualizarProyecto);
router.get('/proyecto/eliminar/:id', eliminar);


export default router;