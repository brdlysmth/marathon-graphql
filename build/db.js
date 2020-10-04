"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUndefined = exports.abortableAtomicWrite = exports.atomicWrite = exports.getValShallow = exports.getVal = exports.admin = exports.db = void 0;
var fbAdmin = __importStar(require("firebase-admin"));
var env_1 = require("./env");
/**
 * Firebase
 */
var creds = env_1.secrets.firebaseCredentials;
creds.credential = fbAdmin.credential.cert(creds.credential);
fbAdmin.initializeApp(creds);
exports.db = fbAdmin.database();
exports.admin = fbAdmin;
function getVal(ref) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ref.once("value").then(function (s) {
        /* Useful for debugging db usage */
        // const path = (ref as any).path.pieces_.join('/');
        // const bytes = JSON.stringify(s.val()).length;
        // const sizeStr =
        //   bytes < 1048576
        //     ? `${(bytes / 1024).toFixed(2)} KiB`
        //     : `${(bytes / 1048576).toFixed(2)} MiB`;
        // console.log(`${sizeStr}: ${path}`);
        return s.val();
    });
}
exports.getVal = getVal;
function getValShallow(ref) {
    return __awaiter(this, void 0, void 0, function () {
        var path, val, res_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    path = ref.path.pieces_.join("/");
                    return [4 /*yield*/, ref.once("value").then(function (s) { return s.val(); })];
                case 1:
                    val = _a.sent();
                    if (val && typeof val === "object") {
                        res_1 = {};
                        Object.keys(res_1).forEach(function (k) {
                            res_1[k] = true;
                        });
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        return [2 /*return*/, res_1];
                    }
                    else {
                        return [2 /*return*/, val];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getValShallow = getValShallow;
function atomicWrite(ref, updater) {
    return __awaiter(this, void 0, void 0, function () {
        var res, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ref.transaction(updater)];
                case 1:
                    res = _a.sent();
                    val = res.snapshot.val();
                    if (!res.committed) {
                        // Typescript should prevent this case
                        throw Error("Atomic write was not committed in atomicReadWrite");
                    }
                    else {
                        // We successfully did the write
                        return [2 /*return*/, { aborted: false, val: val }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.atomicWrite = atomicWrite;
function abortableAtomicWrite(ref, 
// Return undefined causes the write to be aborted
updater) {
    return __awaiter(this, void 0, void 0, function () {
        var res, val;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ref.transaction(updater)];
                case 1:
                    res = _a.sent();
                    val = res.snapshot.val();
                    if (!res.committed) {
                        // We aborted the write (by returning undefined)
                        return [2 /*return*/, { aborted: true, val: val }];
                    }
                    else {
                        // We successfully did the write
                        return [2 /*return*/, { aborted: false, val: val }];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.abortableAtomicWrite = abortableAtomicWrite;
function removeUndefined(v) {
    return JSON.parse(JSON.stringify(v));
}
exports.removeUndefined = removeUndefined;
