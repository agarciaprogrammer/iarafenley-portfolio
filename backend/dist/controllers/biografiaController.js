"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBiografia = exports.getBiografia = void 0;
const { getJson, saveJson } = require('../utils/fileUtils');
const FILE = 'biografia.json';
const getBiografia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getJson(FILE);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al leer la biografia y/o contacto' });
    }
});
exports.getBiografia = getBiografia;
const updateBiografia = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bio, contact } = req.body;
        if (typeof bio !== 'string' || typeof contact !== 'string') {
            res.status(400).json({ error: 'Campos invalidos' });
            return;
        }
        const updatedData = { bio, contact };
        yield saveJson(FILE, updatedData);
        res.json(updatedData);
    }
    catch (err) {
        next(err);
    }
});
exports.updateBiografia = updateBiografia;
