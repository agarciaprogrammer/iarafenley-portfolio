// /routes/obrasRoutes.ts
import { Router } from 'express'
import {
  getObras,
  addObra,
  updateObra,
  deleteObra,
} from '../controllers/obrasController'

const router = Router()

router.get('/', getObras)
router.post('/', addObra)
router.put('/:id', updateObra)
router.delete('/:id', deleteObra)

export default router
