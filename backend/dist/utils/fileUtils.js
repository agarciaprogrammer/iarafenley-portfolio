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
// src/utils/fileUtils.ts
const fs = require('fs/promises');
const path = require('path');
const getJson = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path.join(process.cwd(), 'data', file);
    const data = yield fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
});
const saveJson = (file, data) => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path.join(process.cwd(), 'data', file);
    yield fs.writeFile(filePath, JSON.stringify(data, null, 2));
});
module.exports = { getJson, saveJson };
