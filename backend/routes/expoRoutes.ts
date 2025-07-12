import { Router } from "express";
import { getExposiciones, updateExposicion, crearExpo } from '../controllers/exposicionesController';

const router = Router();

router.get('/', getExposiciones);
router.put("/:id", updateExposicion);
router.post('/', crearExpo);

export default router;
