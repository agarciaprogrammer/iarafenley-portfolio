// backend/routes/obrasRoutes.ts
import express from 'express';
import { getObras, updateObra, deleteObra, uploadObra } from '../controllers/obrasController';
import upload from '../config/multerConfig';

const router = express.Router();

router.get('/', getObras);
router.put('/:id', updateObra);
router.delete('/:id', deleteObra);
router.post('/upload', upload.single('image'), uploadObra);

export default router;