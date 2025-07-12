// /routes/biografiaRoutes.ts
import { Router} from 'express'
import {
  getBiografia,
  updateBiografia
} from '../controllers/biografiaController'

const router = Router()

router.get('/', getBiografia)
router.put('/', updateBiografia)

export default router