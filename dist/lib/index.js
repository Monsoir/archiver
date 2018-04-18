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
    const buildArchiveResult = shell.exec(`xcodebuild archive -workspace ${configurations.pathToWorkspace} -scheme ${configurations.scheme} -configuration ${configurations.configuration} -archivePath ${configurations.archivePath}`);
    if (buildArchiveResult.code !== 0) {
        shell.echo(`build archive failed`);
        shell.exit(1);
    }
    const exportArchiveResult = shell.exec(`xcodebuild -exportArchive -archivePath ${configurations.archivePath}`);
    if (exportArchiveResult.code !== 0) {
        shell.echo('export failed');
        shell.exit(0);
    }
    shell.echo(`Archive succeeded, export path: ${configurations.exportPath}`);
    shell.exit(0);
});
const scanConfigurations = () => __awaiter(this, void 0, void 0, function* () {
    const jsonString = yield utils_1.readFileAsync(ConfigureFilePath);
    const configurations = JSON.parse(jsonString);
    const checkin = ['pathToWorkspace', 'scheme', 'exportOptionsPlist'];
    checkin.forEach(checkee => {
        if (!configurations[checkee]) {
            shell.echo(`${checkee} parameter should not be empty`);
            shell.exit(1);
        }
    });
    configurations.configuration = configurations.configuration || 'Release';
    configurations.archivePath = configurations.archivePath || `./${configurations.scheme}`;
    configurations.exportPath = configurations.exportPath || `./archived`;
    return configurations;
});
archiveiOS();
