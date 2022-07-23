"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.Integration = void 0;
var LitHelper = __importStar(require("./lit-helper"));
var client_1 = require("./client");
var Web3StorageHelper = __importStar(require("./web3.storage-helper"));
var Integration = /** @class */ (function () {
    function Integration(chainParam) {
        if (chainParam === void 0) { chainParam = "ethereum"; }
        this.chain = chainParam;
    }
    Integration.prototype.startLitClient = function (window) {
        (0, client_1._startLitClient)(window);
    };
    /**
    * Encrypts a file using Lit and stored it in Web3 Storage
    *
    * @param {File} fileToEncrypt File to encrypt and store on ceramic
    * @returns {Promise<CIDString>} A promise that resolves to a CID for the Zip file that contains the encrypted file that's been stored
    */
    Integration.prototype.uploadFile = function (fileToEncrypt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, encryptedFileBlob, symmetricKey, encryptedFile, encryptedFileCid, evmContractConditions, encryptedFileMetadata, encryptedFileMetadataFile, encryptedFileMetadataCid, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, LitHelper.encryptFile(fileToEncrypt)
                            // Store encrypted file in IPFS
                        ];
                    case 1:
                        _a = _b.sent(), encryptedFileBlob = _a.encryptedFileBlob, symmetricKey = _a.symmetricKey;
                        encryptedFile = new File([encryptedFileBlob], fileToEncrypt.name, { type: fileToEncrypt.type });
                        return [4 /*yield*/, Web3StorageHelper.storeFiles([encryptedFile])];
                    case 2:
                        encryptedFileCid = _b.sent();
                        evmContractConditions = [
                            {
                                contractAddress: "0xcd1B4690F317F3108f34074620A59dF86baB871D",
                                functionName: "hasAccess",
                                functionParams: [encryptedFileCid, ":userAddress"],
                                functionAbi: {
                                    name: "hasAccess",
                                    inputs: [
                                        {
                                            internalType: "bytes32",
                                            name: "fileId",
                                            type: "bytes32"
                                        },
                                        {
                                            internalType: "address",
                                            name: "recipient",
                                            type: "address"
                                        }
                                    ],
                                    outputs: [
                                        {
                                            internalType: "bool",
                                            name: "_hasAccess",
                                            type: "bool"
                                        }
                                    ],
                                    stateMutability: "view",
                                    payable: false,
                                    type: "function"
                                },
                                chain: this.chain,
                                returnValueTest: {
                                    key: "_hasAccess",
                                    comparator: "=",
                                    value: true,
                                },
                            },
                        ];
                        return [4 /*yield*/, LitHelper.createEncryptedFileMetadata(encryptedFile, encryptedFileCid, symmetricKey, evmContractConditions, this.chain)];
                    case 3:
                        encryptedFileMetadata = _b.sent();
                        encryptedFileMetadataFile = new File([JSON.stringify(encryptedFileMetadata)], 'encryptedFileMetadata.json', { type: 'application/json' });
                        return [4 /*yield*/, Web3StorageHelper.storeFiles([encryptedFileMetadataFile])];
                    case 4:
                        encryptedFileMetadataCid = _b.sent();
                        return [2 /*return*/, encryptedFileMetadataCid];
                    case 5:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, "something went wrong processing file ".concat(fileToEncrypt, ": ").concat(error_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
   * Retrieves a stream and decrypts message then returns to user
   *
   * @param {string} cid the CID of the encrypted data the user wants to access
   * @returns {Promise<File>} A promise with the decrypted file Blob
   */
    Integration.prototype.retrieveAndDecryptFile = function (cid) {
        return __awaiter(this, void 0, void 0, function () {
            var metadataWeb3Files, metadataWeb3File, metadataString, metadata, encryptedWeb3File, decryptedFileBlob, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, Web3StorageHelper.retrieveFiles(cid)];
                    case 1:
                        metadataWeb3Files = _a.sent();
                        if (metadataWeb3Files.length != 1) {
                            throw new Error("Retrieved Web3Storage files are more than one. We expect a single file");
                        }
                        return [4 /*yield*/, metadataWeb3Files[0]];
                    case 2:
                        metadataWeb3File = _a.sent();
                        return [4 /*yield*/, metadataWeb3File.text()];
                    case 3:
                        metadataString = _a.sent();
                        metadata = JSON.parse(metadataString);
                        return [4 /*yield*/, Web3StorageHelper.retrieveFiles(metadata.fileCid)];
                    case 4:
                        encryptedWeb3File = _a.sent();
                        if (encryptedWeb3File.length != 1) {
                            throw new Error("Retrieved Web3Storage files are more than one. We expect a single encrypted file");
                        }
                        return [4 /*yield*/, LitHelper.decryptFile(encryptedWeb3File[0], metadata)];
                    case 5:
                        decryptedFileBlob = _a.sent();
                        return [2 /*return*/, new File([decryptedFileBlob], metadata.fileName, { type: metadata.fileType })];
                    case 6:
                        error_2 = _a.sent();
                        console.log('something went wrong decrypting:', error_2);
                        console.log("CID sent: ".concat(cid));
                        return [2 /*return*/, undefined];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Integration;
}());
exports.Integration = Integration;
