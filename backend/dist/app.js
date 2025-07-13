"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// app.ts
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const obrasRoutes_1 = __importDefault(require("./routes/obrasRoutes"));
const biografiaRoutes_1 = __importDefault(require("./routes/biografiaRoutes"));
const expoRoutes_1 = __importDefault(require("./routes/expoRoutes"));
const app = (0, express_1.default)();
// Middlewares globales
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Rutas
app.use('/api/obras', obrasRoutes_1.default);
app.use('/api/biografia', biografiaRoutes_1.default);
app.use('/api/expo', expoRoutes_1.default);
// Ruta base
app.get('/', (req, res) => {
    res.send('🎨 API de Portfolio - Iara Fenley');
});
// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error inesperado:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});
exports.default = app;
