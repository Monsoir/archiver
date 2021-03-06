"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.testFileExists = (path) => __awaiter(this, void 0, void 0, function* () {
    return new Promise(resolve => {
        fs_1.exists(path, (result) => {
            resolve(result);
        });
    });
});
exports.testDirectoryExists = (path) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        fs_1.stat(path, (err, stats) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(stats.isDirectory());
            }
        });
    });
});
exports.readFileAsync = (path) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resovle, reject) => {
        fs_1.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resovle(data);
            }
        });
    });
});
