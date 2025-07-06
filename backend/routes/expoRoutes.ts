import { Router } from "express";
import { getExposiciones, updateExposicion} from '../controllers/exposicionesController'

const router = Router()

router.get('/', getExposiciones)
router.put("/:id", updateExposicion)

export default router