/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.SoundCard = exports.Registers = exports.Memory = exports.Keyboard = exports.Display = exports.Disassembler = exports.Chip8 = void 0;
var Chip8_1 = __webpack_require__(2);
exports.Chip8 = Chip8_1["default"];
var Disassembler_1 = __webpack_require__(11);
exports.Disassembler = Disassembler_1["default"];
var Display_1 = __webpack_require__(12);
exports.Display = Display_1["default"];
var Keyboard_1 = __webpack_require__(14);
exports.Keyboard = Keyboard_1["default"];
var Memory_1 = __webpack_require__(15);
exports.Memory = Memory_1["default"];
var Registers_1 = __webpack_require__(16);
exports.Registers = Registers_1["default"];
var SoundCard_1 = __webpack_require__(17);
exports.SoundCard = SoundCard_1["default"];


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var services_1 = __webpack_require__(1);
var Chip8 = /** @class */ (function () {
    function Chip8(romBuffer) {
        console.log('Create a new Chip-8');
        this.isRunning = true;
        this.isPaused = false;
        this.timer = constants_1.REGISTERS.HZ120;
        this.memory = new services_1.Memory();
        this.registers = new services_1.Registers();
        this.loadCharSet();
        this.loadRom(romBuffer);
        this.keyboard = new services_1.Keyboard();
        this.soundCard = new services_1.SoundCard();
        this.disassembler = new services_1.Disassembler();
        this.display = new services_1.Display(this.memory.memory);
        this.loop();
        console.log('Success! Powered by <kastor.code/>');
    }
    Chip8.start = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var rom;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rom = null;
                        if (!(typeof file === 'string')) return [3 /*break*/, 3];
                        return [4 /*yield*/, fetch(file)];
                    case 1:
                        rom = _a.sent();
                        return [4 /*yield*/, rom.arrayBuffer()];
                    case 2:
                        rom = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, file.arrayBuffer()];
                    case 4:
                        rom = _a.sent();
                        _a.label = 5;
                    case 5:
                        globalThis.chip8 = new Chip8(new Uint8Array(rom));
                        return [2 /*return*/];
                }
            });
        });
    };
    Chip8.prototype.loop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isRunning) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.sleep()];
                    case 1:
                        _a.sent();
                        if (this.isPaused) {
                            return [3 /*break*/, 0];
                        }
                        if (this.registers.DT > 0) {
                            this.registers.DT--;
                        }
                        if (this.registers.ST > 0) {
                            this.soundCard.enableSound();
                            this.registers.ST--;
                        }
                        if (this.registers.ST == 0) {
                            this.soundCard.disableSound();
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < 8)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.execute(this.memory.getOpcode(this.registers.PC))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 0];
                    case 6:
                        globalThis.chip8 = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    Chip8.prototype.pause = function () {
        this.isPaused = true;
    };
    Chip8.prototype.togglePause = function () {
        this.isPaused = !this.isPaused;
    };
    Chip8.prototype.stop = function () {
        this.isPaused = true;
        this.isRunning = false;
    };
    Chip8.prototype.sleep = function (ms) {
        if (ms === void 0) { ms = this.timer; }
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    Chip8.prototype.setTimer = function (key) {
        if (typeof constants_1.REGISTERS[key] === 'number') {
            this.timer = constants_1.REGISTERS[key];
        }
    };
    Chip8.prototype.loadCharSet = function () {
        this.memory.memory.set(constants_1.CHAR_SET.CHARACTERS, constants_1.MEMORY.CHAR_SET_ADDRESS);
    };
    Chip8.prototype.loadRom = function (romBuffer) {
        console.assert(romBuffer.length + constants_1.MEMORY.START_PROGRAMS <= constants_1.MEMORY.SIZE, '[Error] This rom is bigger than ' + constants_1.MEMORY.SIZE + ' bytes');
        this.memory.memory.set(romBuffer, constants_1.MEMORY.START_PROGRAMS);
        this.registers.PC = constants_1.MEMORY.START_PROGRAMS;
    };
    Chip8.prototype.execute = function (opcode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, instruction, args, _b, keyPressed, x, hundreds, tens, ones, i, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.disassembler.disassemble(opcode), instruction = _a.instruction, args = _a.args;
                        this.registers.PC += 2;
                        _b = instruction.id;
                        switch (_b) {
                            case 'CLS': return [3 /*break*/, 1];
                            case 'RET': return [3 /*break*/, 2];
                            case 'JP_ADDR': return [3 /*break*/, 3];
                            case 'CALL_ADDR': return [3 /*break*/, 4];
                            case 'SE_VX_KK': return [3 /*break*/, 5];
                            case 'SNE_VX_KK': return [3 /*break*/, 6];
                            case 'SE_VX_VY': return [3 /*break*/, 7];
                            case 'LD_VX_KK': return [3 /*break*/, 8];
                            case 'ADD_VX_KK': return [3 /*break*/, 9];
                            case 'LD_VX_VY': return [3 /*break*/, 10];
                            case 'OR_VX_VY': return [3 /*break*/, 11];
                            case 'AND_VX_VY': return [3 /*break*/, 12];
                            case 'XOR_VX_VY': return [3 /*break*/, 13];
                            case 'ADD_VX_VY': return [3 /*break*/, 14];
                            case 'SUB_VX_VY': return [3 /*break*/, 15];
                            case 'SHR_VX_VY': return [3 /*break*/, 16];
                            case 'SUBN_VX_VY': return [3 /*break*/, 17];
                            case 'SHL_VX_VY': return [3 /*break*/, 18];
                            case 'SNE_VX_VY': return [3 /*break*/, 19];
                            case 'LD_I_ADDR': return [3 /*break*/, 20];
                            case 'JP_V0_ADDR': return [3 /*break*/, 21];
                            case 'RND_VX_KK': return [3 /*break*/, 22];
                            case 'DRW_VX_VY_N': return [3 /*break*/, 23];
                            case 'SKP_VX': return [3 /*break*/, 24];
                            case 'SKNP_VX': return [3 /*break*/, 25];
                            case 'LD_VX_DT': return [3 /*break*/, 26];
                            case 'LD_VX_K': return [3 /*break*/, 27];
                            case 'LD_DT_VX': return [3 /*break*/, 31];
                            case 'LD_ST_VX': return [3 /*break*/, 32];
                            case 'ADD_I_VX': return [3 /*break*/, 33];
                            case 'LD_F_VX': return [3 /*break*/, 34];
                            case 'LD_B_VX': return [3 /*break*/, 35];
                            case 'LD_I_VX': return [3 /*break*/, 36];
                            case 'LD_VX_I': return [3 /*break*/, 37];
                        }
                        return [3 /*break*/, 38];
                    case 1:
                        {
                            this.display.reset();
                            return [3 /*break*/, 39];
                        }
                        _c.label = 2;
                    case 2:
                        {
                            this.registers.PC = this.registers.stackPop();
                            return [3 /*break*/, 39];
                        }
                        _c.label = 3;
                    case 3:
                        {
                            this.registers.PC = args[0];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 4;
                    case 4:
                        {
                            this.registers.stackPush(this.registers.PC);
                            this.registers.PC = args[0];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 5;
                    case 5:
                        {
                            if (this.registers.V[args[0]] === args[1]) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 6;
                    case 6:
                        {
                            if (this.registers.V[args[0]] !== args[1]) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 7;
                    case 7:
                        {
                            if (this.registers.V[args[0]] === this.registers.V[args[1]]) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 8;
                    case 8:
                        {
                            this.registers.V[args[0]] = args[1];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 9;
                    case 9:
                        {
                            this.registers.V[args[0]] += args[1];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 10;
                    case 10:
                        {
                            this.registers.V[args[0]] = this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 11;
                    case 11:
                        {
                            this.registers.V[args[0]] |= this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 12;
                    case 12:
                        {
                            this.registers.V[args[0]] &= this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 13;
                    case 13:
                        {
                            this.registers.V[args[0]] ^= this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 14;
                    case 14:
                        {
                            this.registers.V[0x0f] = Number(this.registers.V[args[0]] + this.registers.V[args[1]] > 0xff);
                            this.registers.V[args[0]] += this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 15;
                    case 15:
                        {
                            this.registers.V[0x0f] = Number(this.registers.V[args[0]] > this.registers.V[args[1]]);
                            this.registers.V[args[0]] -= this.registers.V[args[1]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 16;
                    case 16:
                        {
                            this.registers.V[0x0f] = this.registers.V[args[0]] & 1;
                            this.registers.V[args[0]] >>= 1;
                            return [3 /*break*/, 39];
                        }
                        _c.label = 17;
                    case 17:
                        {
                            this.registers.V[0x0f] = Number(this.registers.V[args[1]] > this.registers.V[args[0]]);
                            this.registers.V[args[0]] = this.registers.V[args[1]] - this.registers.V[args[0]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 18;
                    case 18:
                        {
                            this.registers.V[0x0f] = Number(Boolean(this.registers.V[args[0]] & 0x80));
                            this.registers.V[args[0]] <<= 1;
                            return [3 /*break*/, 39];
                        }
                        _c.label = 19;
                    case 19:
                        {
                            if (this.registers.V[args[0]] !== this.registers.V[args[1]]) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 20;
                    case 20:
                        {
                            this.registers.I = args[0];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 21;
                    case 21:
                        {
                            this.registers.PC = args[0] + this.registers.V[0];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 22;
                    case 22:
                        {
                            this.registers.V[args[0]] = ((Math.floor(Math.random() * 255)) & args[1]);
                            return [3 /*break*/, 39];
                        }
                        _c.label = 23;
                    case 23:
                        {
                            this.registers.V[0x0f] = this.display.drawSprite(this.registers.V[args[1]], this.registers.V[args[0]], this.registers.I, args[2]);
                            return [3 /*break*/, 39];
                        }
                        _c.label = 24;
                    case 24:
                        {
                            if (this.keyboard.isKeydown(this.registers.V[args[0]])) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 25;
                    case 25:
                        {
                            if (!this.keyboard.isKeydown(this.registers.V[args[0]])) {
                                this.registers.PC += 2;
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 26;
                    case 26:
                        {
                            this.registers.V[args[0]] = this.registers.DT;
                            return [3 /*break*/, 39];
                        }
                        _c.label = 27;
                    case 27:
                        keyPressed = -1;
                        _c.label = 28;
                    case 28:
                        if (!(keyPressed == -1)) return [3 /*break*/, 30];
                        keyPressed = this.keyboard.hasKeydown();
                        return [4 /*yield*/, this.sleep()];
                    case 29:
                        _c.sent();
                        return [3 /*break*/, 28];
                    case 30:
                        this.registers.V[args[0]] = keyPressed;
                        return [3 /*break*/, 39];
                    case 31:
                        {
                            this.registers.DT = this.registers.V[args[0]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 32;
                    case 32:
                        {
                            this.registers.ST = this.registers.V[args[0]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 33;
                    case 33:
                        {
                            this.registers.I += this.registers.V[args[0]];
                            return [3 /*break*/, 39];
                        }
                        _c.label = 34;
                    case 34:
                        {
                            this.registers.I = this.registers.V[args[0]] * constants_1.DISPLAY.SPRITE_HEIGHT;
                            return [3 /*break*/, 39];
                        }
                        _c.label = 35;
                    case 35:
                        {
                            x = this.registers.V[args[0]];
                            hundreds = Math.floor(x / 100);
                            x = x - hundreds * 100;
                            tens = Math.floor(x / 10);
                            ones = Math.floor(x - tens * 10);
                            this.memory.setMemory(this.registers.I, hundreds);
                            this.memory.setMemory(this.registers.I + 1, tens);
                            this.memory.setMemory(this.registers.I + 2, ones);
                            return [3 /*break*/, 39];
                        }
                        _c.label = 36;
                    case 36:
                        {
                            for (i = 0; i <= args[0]; i++) {
                                this.memory.setMemory(this.registers.I + i, this.registers.V[i]);
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 37;
                    case 37:
                        {
                            for (i = 0; i <= args[0]; i++) {
                                this.registers.V[i] = this.memory.getMemory(this.registers.I + i);
                            }
                            return [3 /*break*/, 39];
                        }
                        _c.label = 38;
                    case 38:
                        {
                            console.error('[Error] CPU instruction "' + instruction.id + '" does not exist.');
                            return [3 /*break*/, 39];
                        }
                        _c.label = 39;
                    case 39: return [2 /*return*/];
                }
            });
        });
    };
    return Chip8;
}());
exports["default"] = Chip8;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
exports.SOUND_CARD = exports.REGISTERS = exports.MEMORY = exports.KEYBOARD = exports.INSTRUCTION_SET = exports.DISPLAY = exports.CHAR_SET = void 0;
var CharSet_1 = __webpack_require__(4);
exports.CHAR_SET = CharSet_1["default"];
var Display_1 = __webpack_require__(5);
exports.DISPLAY = Display_1["default"];
var InstructionSet_1 = __webpack_require__(6);
exports.INSTRUCTION_SET = InstructionSet_1["default"];
var Keyboard_1 = __webpack_require__(7);
exports.KEYBOARD = Keyboard_1["default"];
var Memory_1 = __webpack_require__(8);
exports.MEMORY = Memory_1["default"];
var Registers_1 = __webpack_require__(9);
exports.REGISTERS = Registers_1["default"];
var SoundCard_1 = __webpack_require__(10);
exports.SOUND_CARD = SoundCard_1["default"];


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var CHAR_SET = {
    WIDTH: 8,
    CHARACTERS: [
        0xF0,
        0x90,
        0x90,
        0x90,
        0xF0,
        0x20,
        0x60,
        0x20,
        0x20,
        0x70,
        0xF0,
        0x10,
        0xF0,
        0x80,
        0xF0,
        0xF0,
        0x10,
        0xF0,
        0x10,
        0xF0,
        0x90,
        0x90,
        0xF0,
        0x10,
        0x10,
        0xF0,
        0x80,
        0xF0,
        0x10,
        0xF0,
        0xF0,
        0x80,
        0xF0,
        0x90,
        0xF0,
        0xF0,
        0x10,
        0x20,
        0x40,
        0x40,
        0xF0,
        0x90,
        0xF0,
        0x90,
        0xF0,
        0xF0,
        0x90,
        0xF0,
        0x10,
        0xF0,
        0xF0,
        0x90,
        0xF0,
        0x90,
        0x90,
        0xE0,
        0x90,
        0xE0,
        0x90,
        0xE0,
        0xF0,
        0x80,
        0x80,
        0x80,
        0xF0,
        0xE0,
        0x90,
        0x90,
        0x90,
        0xE0,
        0xF0,
        0x80,
        0xF0,
        0x80,
        0xF0,
        0xF0,
        0x80,
        0xF0,
        0x80,
        0x80
    ]
};
exports["default"] = CHAR_SET;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var DISPLAY = {
    WIDTH: 64,
    HEIGHT: 32,
    SCALE: 10,
    COLOR: '#33ff66',
    SPRITE_HEIGHT: 5
};
exports["default"] = DISPLAY;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var MASK_HIGHEST_AND_LOWEST_BYTE = 0xf00f;
var MASK_HIGHEST_BYTE = 0xf000;
var MASK_KK = { mask: 0x00ff };
var MASK_N = { mask: 0x000f };
var MASK_NNN = { mask: 0x0fff };
var MASK_X = { mask: 0x0f00, shift: 8 };
var MASK_Y = { mask: 0x00f0, shift: 4 };
var INSTRUCTION_SET = {
    INSTRUCTIONS: [
        {
            key: 2,
            id: 'CLS',
            name: 'CLS',
            mask: 0xffff,
            pattern: 0x00e0,
            arguments: []
        },
        {
            key: 3,
            id: 'RET',
            name: 'RET',
            mask: 0xffff,
            pattern: 0x00ee,
            arguments: []
        },
        {
            key: 4,
            id: 'JP_ADDR',
            name: 'JP',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x1000,
            arguments: [MASK_NNN]
        },
        {
            key: 5,
            id: 'CALL_ADDR',
            name: 'CALL',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x2000,
            arguments: [MASK_NNN]
        },
        {
            key: 6,
            id: 'SE_VX_KK',
            name: 'SE',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x3000,
            arguments: [MASK_X, MASK_KK]
        },
        {
            key: 7,
            id: 'SNE_VX_KK',
            name: 'SNE',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x4000,
            arguments: [MASK_X, MASK_KK]
        },
        {
            key: 8,
            id: 'SE_VX_VY',
            name: 'SE',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x5000,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 9,
            id: 'LD_VX_KK',
            name: 'LD',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x6000,
            arguments: [MASK_X, MASK_KK]
        },
        {
            key: 10,
            id: 'ADD_VX_KK',
            name: 'ADD',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0x7000,
            arguments: [MASK_X, MASK_KK]
        },
        {
            key: 11,
            id: 'LD_VX_VY',
            name: 'LD',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8000,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 12,
            id: 'OR_VX_VY',
            name: 'OR',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8001,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 13,
            id: 'AND_VX_VY',
            name: 'AND',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8002,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 14,
            id: 'XOR_VX_VY',
            name: 'XOR',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8003,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 15,
            id: 'ADD_VX_VY',
            name: 'ADD',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8004,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 16,
            id: 'SUB_VX_VY',
            name: 'SUB',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8005,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 17,
            id: 'SHR_VX_VY',
            name: 'SHR',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8006,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 18,
            id: 'SUBN_VX_VY',
            name: 'SUBN',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x8007,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 19,
            id: 'SHL_VX_VY',
            name: 'SHL',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x800e,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 20,
            id: 'SNE_VX_VY',
            name: 'SNE',
            mask: MASK_HIGHEST_AND_LOWEST_BYTE,
            pattern: 0x9000,
            arguments: [MASK_X, MASK_Y]
        },
        {
            key: 21,
            id: 'LD_I_ADDR',
            name: 'LD',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0xa000,
            arguments: [MASK_NNN]
        },
        {
            key: 22,
            id: 'JP_V0_ADDR',
            name: 'JP',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0xb000,
            arguments: [MASK_NNN]
        },
        {
            key: 23,
            id: 'RND_VX_KK',
            name: 'RND',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0xc000,
            arguments: [MASK_X, MASK_KK]
        },
        {
            key: 24,
            id: 'DRW_VX_VY_N',
            name: 'DRW',
            mask: MASK_HIGHEST_BYTE,
            pattern: 0xd000,
            arguments: [MASK_X, MASK_Y, MASK_N]
        },
        {
            key: 25,
            id: 'SKP_VX',
            name: 'SKP',
            mask: 0xf0ff,
            pattern: 0xe09e,
            arguments: [MASK_X]
        },
        {
            key: 26,
            id: 'SKNP_VX',
            name: 'SKNP',
            mask: 0xf0ff,
            pattern: 0xe0a1,
            arguments: [MASK_X]
        },
        {
            key: 27,
            id: 'LD_VX_DT',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf007,
            arguments: [MASK_X]
        },
        {
            key: 28,
            id: 'LD_VX_K',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf00a,
            arguments: [MASK_X]
        },
        {
            key: 29,
            id: 'LD_DT_VX',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf015,
            arguments: [MASK_X]
        },
        {
            key: 30,
            id: 'LD_ST_VX',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf018,
            arguments: [MASK_X]
        },
        {
            key: 31,
            id: 'ADD_I_VX',
            name: 'ADD',
            mask: 0xf0ff,
            pattern: 0xf01e,
            arguments: [MASK_X]
        },
        {
            key: 32,
            id: 'LD_F_VX',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf029,
            arguments: [MASK_X]
        },
        {
            key: 33,
            id: 'LD_B_VX',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf033,
            arguments: [MASK_X]
        },
        {
            key: 34,
            id: 'LD_I_VX',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf055,
            arguments: [MASK_X]
        },
        {
            key: 35,
            id: 'LD_VX_I',
            name: 'LD',
            mask: 0xf0ff,
            pattern: 0xf065,
            arguments: [MASK_X]
        }
    ]
};
exports["default"] = INSTRUCTION_SET;


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var KEYBOARD = {
    KEYS_TOTAL: 16,
    KEY_MAP: [
        'x', '1', '2', '3',
        'q', 'w', 'e', 'a',
        's', 'd', 'z', 'c',
        '4', 'r', 'f', 'v'
    ]
};
exports["default"] = KEYBOARD;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var MEMORY = {
    SIZE: 4095,
    START_PROGRAMS: 0x200,
    CHAR_SET_ADDRESS: 0x000
};
exports["default"] = MEMORY;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var REGISTERS = {
    TOTAL: 16,
    STACK_DEEP: 16,
    HZ15: Math.floor(1000 / 15),
    HZ30: Math.floor(1000 / 30),
    HZ60: Math.floor(1000 / 60),
    HZ120: Math.floor(1000 / 120),
    HZ240: Math.floor(1000 / 240)
};
exports["default"] = REGISTERS;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

exports.__esModule = true;
var SOUND_CARD = {
    INITIAL_VOLUME: 0.3
};
exports["default"] = SOUND_CARD;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var Disassembler = /** @class */ (function () {
    function Disassembler() {
        console.log('Create a new Disassembler');
    }
    Disassembler.prototype.disassemble = function (opcode) {
        var instruction = constants_1.INSTRUCTION_SET.INSTRUCTIONS.find(function (_a) {
            var mask = _a.mask, pattern = _a.pattern;
            return (opcode & mask) === pattern;
        });
        var args = instruction.arguments.map(function (_a) {
            var mask = _a.mask, shift = _a.shift;
            return (opcode & mask) >> shift;
        });
        return {
            instruction: instruction,
            args: args
        };
    };
    return Disassembler;
}());
exports["default"] = Disassembler;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var Display = /** @class */ (function () {
    function Display(memory) {
        console.log('Create a new Display');
        this.memory = memory;
        this.screen = document.querySelector('canvas');
        this.screen.width = constants_1.DISPLAY.WIDTH * constants_1.DISPLAY.SCALE;
        this.screen.height = constants_1.DISPLAY.HEIGHT * constants_1.DISPLAY.SCALE;
        this.context = this.screen.getContext('2d');
        this.resetColors();
        this.frameBuffer = [];
        for (var h = 0; h < constants_1.DISPLAY.HEIGHT; h++) {
            this.frameBuffer.push([]);
        }
        this.reset();
    }
    Display.prototype.reset = function () {
        for (var h = 0; h < constants_1.DISPLAY.HEIGHT; h++) {
            for (var w = 0; w < constants_1.DISPLAY.WIDTH; w++) {
                this.frameBuffer[h][w] = 0;
            }
        }
        this.context.fillStyle = this.bgColor;
        this.context.fillRect(0, 0, this.screen.width, this.screen.height);
    };
    Display.prototype.drawBuffer = function () {
        for (var h = 0; h < constants_1.DISPLAY.HEIGHT; h++) {
            for (var w = 0; w < constants_1.DISPLAY.WIDTH; w++) {
                this.drawPixel(h, w, this.frameBuffer[h][w]);
            }
        }
    };
    Display.prototype.drawPixel = function (h, w, value) {
        this.context.fillStyle = value
            ? this.color : this.bgColor;
        this.context.fillRect(w * constants_1.DISPLAY.SCALE, h * constants_1.DISPLAY.SCALE, constants_1.DISPLAY.SCALE, constants_1.DISPLAY.SCALE);
    };
    Display.prototype.drawSprite = function (h, w, sprite, rows) {
        var pixelCollision = 0;
        for (var y = 0; y < rows; y++) {
            var line = this.memory[sprite + y];
            for (var x = 0; x < constants_1.CHAR_SET.WIDTH; x++) {
                var bitToCheck = 128 >> x;
                var value = line & bitToCheck;
                if (value === 0) {
                    continue;
                }
                var pixelHeight = ((h + y) % constants_1.DISPLAY.HEIGHT);
                var pixelWidth = ((w + x) % constants_1.DISPLAY.WIDTH);
                if (this.frameBuffer[pixelHeight][pixelWidth] === 1) {
                    pixelCollision = 1;
                }
                this.frameBuffer[pixelHeight][pixelWidth] ^= 1;
            }
        }
        this.drawBuffer();
        return pixelCollision;
    };
    Display.prototype.resetColors = function () {
        this.setColors(constants_1.DISPLAY.COLOR);
    };
    Display.prototype.setColors = function (color) {
        var tinycolor = __webpack_require__(13);
        var bgColor = tinycolor(color);
        var fgColor = tinycolor(color);
        if (fgColor.isLight()) {
            bgColor = bgColor.desaturate(50);
            bgColor = bgColor.darken(50);
        }
        else {
            bgColor = bgColor.saturate(50);
            bgColor = bgColor.lighten(50);
        }
        this.bgColor = bgColor.toString();
        this.color = fgColor.toString();
    };
    return Display;
}());
exports["default"] = Display;


/***/ }),
/* 13 */
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_RESULT__;// TinyColor v1.4.2
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color,
    this._r = rgb.r,
    this._g = rgb.g,
    this._b = rgb.b,
    this._a = rgb.a,
    this._roundA = mathRound(100*this._a) / 100,
    this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return p + (q - p) * 6 * t;
        if(t < 1/2) return q;
        if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size ;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ( true && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {return tinycolor;}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
// Browser: Expose to window
else {}

})(Math);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        var _this = this;
        console.log('Create a new Keyboard');
        this.keys = new Array(constants_1.KEYBOARD.KEYS_TOTAL).fill(false);
        document.addEventListener('keydown', function (event) { return _this.keydown(event); });
        document.addEventListener('keyup', function (event) { return _this.keyup(event); });
    }
    Keyboard.prototype.keydown = function (_a) {
        var key = _a.key;
        var keyIndex = constants_1.KEYBOARD.KEY_MAP.findIndex(function (mapKey) { return mapKey == key.toLowerCase(); });
        if (keyIndex == -1) {
            return;
        }
        this.keys[keyIndex] = true;
    };
    Keyboard.prototype.keyup = function (_a) {
        var key = _a.key;
        var keyIndex = constants_1.KEYBOARD.KEY_MAP.findIndex(function (mapKey) { return mapKey == key.toLowerCase(); });
        if (keyIndex == -1) {
            return;
        }
        this.keys[keyIndex] = false;
    };
    Keyboard.prototype.isKeydown = function (keyIndex) {
        return this.keys[keyIndex];
    };
    Keyboard.prototype.hasKeydown = function () {
        return this.keys.findIndex(function (key) { return key; });
    };
    return Keyboard;
}());
exports["default"] = Keyboard;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var Memory = /** @class */ (function () {
    function Memory() {
        console.log('Create a new Memory');
        this.memory = new Uint8Array(constants_1.MEMORY.SIZE);
        this.reset();
    }
    Memory.prototype.reset = function () {
        this.memory.fill(0);
    };
    Memory.prototype.setMemory = function (index, value) {
        this.assertMemory(index);
        this.memory[index] = value;
    };
    Memory.prototype.getMemory = function (index) {
        this.assertMemory(index);
        return this.memory[index];
    };
    Memory.prototype.getOpcode = function (index) {
        var highByte = this.getMemory(index);
        var lowByte = this.getMemory(index + 1);
        return (highByte << 8) | lowByte;
    };
    Memory.prototype.assertMemory = function (index) {
        console.assert(index > -1 && index < constants_1.MEMORY.SIZE, '[Error] Trying to access an out of range memory index\n' + index);
    };
    return Memory;
}());
exports["default"] = Memory;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var Registers = /** @class */ (function () {
    function Registers() {
        console.log('Create a new Registers');
        this.V = new Uint8Array(constants_1.REGISTERS.TOTAL);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = constants_1.MEMORY.START_PROGRAMS;
        this.SP = -1;
        this.stack = new Uint16Array(constants_1.REGISTERS.STACK_DEEP);
        this.reset();
    }
    Registers.prototype.reset = function () {
        this.V.fill(0);
        this.I = 0;
        this.DT = 0;
        this.ST = 0;
        this.PC = constants_1.MEMORY.START_PROGRAMS;
        this.SP = -1;
        this.stack.fill(0);
    };
    Registers.prototype.stackPush = function (value) {
        this.SP++;
        this.assertStackOverflow();
        this.stack[this.SP] = value;
    };
    Registers.prototype.stackPop = function () {
        var value = this.stack[this.SP];
        this.SP--;
        this.assertStackUnderflow();
        return value;
    };
    Registers.prototype.assertStackOverflow = function () {
        console.assert(this.SP < constants_1.REGISTERS.STACK_DEEP, '[Error] Stack overflow\n' + this.SP);
    };
    Registers.prototype.assertStackUnderflow = function () {
        console.assert(this.SP > -2, '[Error] Stack underflow\n' + this.SP);
    };
    return Registers;
}());
exports["default"] = Registers;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

exports.__esModule = true;
var constants_1 = __webpack_require__(3);
var SoundCard = /** @class */ (function () {
    function SoundCard() {
        console.log('Create a new SoundCard');
        this.soundEnabled = false;
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            // @ts-ignore
            var audioContext_1 = new (AudioContext || webkitAudioContext)();
            var masterGain_1 = new GainNode(audioContext_1);
            masterGain_1.gain.value = constants_1.SOUND_CARD.INITIAL_VOLUME;
            masterGain_1.connect(audioContext_1.destination);
            var soundEnabled_1 = false;
            var oscillator_1;
            Object.defineProperties(this, {
                soundEnabled: {
                    get: function () { return soundEnabled_1; },
                    set: function (value) {
                        if (value == soundEnabled_1) {
                            return;
                        }
                        soundEnabled_1 = value;
                        if (soundEnabled_1) {
                            oscillator_1 = new OscillatorNode(audioContext_1, { type: 'square' });
                            oscillator_1.connect(masterGain_1);
                            oscillator_1.start();
                        }
                        else {
                            oscillator_1.stop();
                        }
                    }
                }
            });
        }
    }
    SoundCard.prototype.enableSound = function () {
        this.soundEnabled = true;
    };
    SoundCard.prototype.disableSound = function () {
        this.soundEnabled = false;
    };
    return SoundCard;
}());
exports["default"] = SoundCard;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

exports.__esModule = true;
var services_1 = __webpack_require__(1);
globalThis.chip8 = null;
globalThis.Chip8 = services_1.Chip8;

})();

/******/ })()
;