"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell = __importStar(require("shelljs"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const ConfigureFilePath = `${process.cwd()}/${constants_1.CONFIG_FILE_NAME}`;
const archiveiOS = () => __awaiter(this, void 0, void 0, function* () {
    if (!shell.which(constants_1.NEEDED_COMMAND)) {
        shell.echo(`${constants_1.NEEDED_COMMAND} command does not exist`);
        shell.exit(1);
    }
    const configFileExists = yield utils_1.testFileExists(ConfigureFilePath);
    if (!configFileExists) {
        shell.echo(`${constants_1.CONFIG_FILE_NAME} does not exist`);
        shell.exit(1);
    }
    const configurations = yield scanConfigurations();
    console.log(configurations);
});
const scanConfigurations = () => __awaiter(this, void 0, void 0, function* () {
    const jsonString = yield utils_1.readFileAsync(ConfigureFilePath);
    const configurations = JSON.parse(jsonString);
    const checkin = ['xcworkspace', 'scheme', 'exportOptionsPlist'];
    checkin.forEach(checkee => {
        if (!configurations[checkee]) {
            shell.echo(`${checkee} parameter should not be empty`);
            shell.exit(1);
        }
    });
    configurations.iosPath = configurations.iosPath || `${process.cwd()}/ios`;
    let iosProjectExists = false;
    try {
        iosProjectExists = yield utils_1.testDirectoryExists(configurations.iosPath);
    }
    catch (e) {
        shell.echo(`${configurations.iosPath} directory does not exist`);
        shell.exit(1);
    }
    if (!iosProjectExists) {
        shell.echo(`${configurations.iosPath} directory does not exist`);
        shell.exit(1);
    }
    const suffix = `.xcworkspace`;
    if (!configurations.xcworkspace.endsWith(suffix)) {
        configurations.xcworkspace = configurations.xcworkspace.concat(suffix);
    }
    configurations.configuration = configurations.configuration || 'Release';
    configurations.archivePath = configurations.archivePath || `./${configurations.scheme}`;
    configurations.exportPath = configurations.exportPath || `./archived`;
    return configurations;
});
archiveiOS();
