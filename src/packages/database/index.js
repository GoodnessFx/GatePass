"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.PrismaClient = void 0;
var client_1 = require("./generated/client");
Object.defineProperty(exports, "PrismaClient", { enumerable: true, get: function () { return client_1.PrismaClient; } });
var client_2 = require("./client");
Object.defineProperty(exports, "prisma", { enumerable: true, get: function () { return client_2.prisma; } });
