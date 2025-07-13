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
exports.uploadObra = exports.deleteObra = exports.updateObra = exports.getObras = void 0;
const { getJson, saveJson } = require('../utils/fileUtils');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const upload = require('../config/multerConfig');
const FILE = 'obras.json';
const getObras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obras = yield getJson(FILE);
        res.json(obras);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al leer las obras' });
    }
});
exports.getObras = getObras;
const updateObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const obras = yield getJson(FILE);
        const idx = obras.findIndex((o) => o.id === id);
        if (idx === -1) {
            res.status(404).json({ error: 'Obra no encontrada' });
            return;
        }
        obras[idx] = Object.assign(Object.assign({}, obras[idx]), req.body);
        yield saveJson(FILE, obras);
        res.json(obras[idx]);
    }
    catch (err) {
        res.status(500).json({ error: "Error al actualizar una obra" });
    }
});
exports.updateObra = updateObra;
const deleteObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const obras = yield getJson(FILE);
        const nuevasObras = obras.filter((o) => o.id !== id);
        if (nuevasObras.length === obras.length) {
            res.status(404).json({ error: 'Obra no encontrada' });
            return;
        }
        yield saveJson(FILE, nuevasObras);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Error al borrar una obra" });
    }
});
exports.deleteObra = deleteObra;
const allowedTypes = ['dibujo', 'escultura', 'grabado', 'pintura'];
const uploadObra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoria, titulo, tecnica, anio } = req.body;
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded.' });
            return;
        }
        if (!allowedTypes.includes(categoria)) {
            res.status(400).json({ error: 'Categoría inválida.' });
            return;
        }
        const destination = path.resolve(__dirname, '../uploads', categoria);
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.webp`;
        const finalPath = path.join(destination, uniqueName);
        console.log('Destino final de imagen:', finalPath);
        // Convertir imagen a .webp y guardar
        yield sharp(req.file.path).toFormat('webp').toFile(finalPath);
        fs.unlinkSync(req.file.path); // Eliminar temporal
        const newObra = {
            id: Date.now().toString(),
            src: `/uploads/${categoria}/${uniqueName}`,
            categoria,
            titulo,
            tecnica,
            anio,
        };
        const obras = yield getJson(FILE);
        obras.push(newObra);
        yield saveJson(FILE, obras);
        res.status(201).json(newObra);
    }
    catch (error) {
        console.error('Error al agregar obra:', error);
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        res.status(500).json({ error: errorMessage });
    }
});
exports.uploadObra = uploadObra;
