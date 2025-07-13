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
exports.crearExpo = exports.updateExposicion = exports.getExposiciones = void 0;
const { getJson, saveJson } = require('../utils/fileUtils');
const FILE = 'exposiciones.json';
const getExposiciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getJson(FILE);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al leer las exposiciones' });
    }
});
exports.getExposiciones = getExposiciones;
const updateExposicion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { text } = req.body;
        if (typeof text !== 'string') {
            res.status(400).json({ error: 'Campo text inválido' });
            return;
        }
        const data = yield getJson(FILE);
        const idx = data.findIndex((expo) => expo.id === id);
        if (idx === -1) {
            res.status(404).json({ error: 'Exposición no encontrada' });
            return;
        }
        data[idx].text = text;
        yield saveJson(FILE, data);
        res.json(data[idx]);
    }
    catch (err) {
        next(err);
    }
});
exports.updateExposicion = updateExposicion;
const crearExpo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        if (typeof text !== 'string') {
            res.status(400).json({ error: 'Texto de exposición requerido' });
            return;
        }
        const data = yield getJson(FILE);
        const nuevaExpo = {
            id: Date.now().toString(),
            text: text.trim(),
        };
        data.push(nuevaExpo);
        yield saveJson(FILE, data);
        res.status(201).json(nuevaExpo);
    }
    catch (error) {
        console.error('Error al crear exposición:', error);
        res.status(500).json({ error: 'Error al crear la exposición' });
    }
});
exports.crearExpo = crearExpo;
