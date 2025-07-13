"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/obrasRoutes.ts
const express_1 = __importDefault(require("express"));
const obrasController_1 = require("../controllers/obrasController");
const multerConfig_1 = __importDefault(require("../uploads/multerConfig"));
const router = express_1.default.Router();
router.get('/', obrasController_1.getObras);
router.put('/:id', obrasController_1.updateObra);
router.delete('/:id', obrasController_1.deleteObra);
router.post('/upload', multerConfig_1.default.single('image'), obrasController_1.uploadObra);
exports.default = router;
