"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exposicionesController_1 = require("../controllers/exposicionesController");
const router = (0, express_1.Router)();
router.get('/', exposicionesController_1.getExposiciones);
router.put("/:id", exposicionesController_1.updateExposicion);
router.post('/', exposicionesController_1.crearExpo);
exports.default = router;
