"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /routes/biografiaRoutes.ts
const express_1 = require("express");
const biografiaController_1 = require("../controllers/biografiaController");
const router = (0, express_1.Router)();
router.get('/', biografiaController_1.getBiografia);
router.put('/', biografiaController_1.updateBiografia);
exports.default = router;
