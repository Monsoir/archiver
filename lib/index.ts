import * as fs from 'fs';
import * as shell from 'shelljs';
import { testFileExists, readFileAsync } from './utils';
import { NEEDED_COMMAND, CONFIG_FILE_NAME, IOS_NATIVE_DIRECTORY, IConfiguration } from './constants';

/**
 * 1. 检查 xcodebuild 命令是否存在
 * 2. 检查 .archive.json 是否存在
 * 3. 检查 iOS 原生项目是否存在
 * 4. archive
 * 5. export
 */

const ConfigureFilePath = `${process.cwd()}/${CONFIG_FILE_NAME}`;

const archiveiOS = async () => {
    // 检查 xcodebuild 命令是否存在
    if (!shell.which(NEEDED_COMMAND)) {
        shell.echo(`${NEEDED_COMMAND} command does not exist`);
        shell.exit(1);
    }

    // 检查配置文件是否存在
    const configFileExists = await testFileExists(ConfigureFilePath);
    if (!configFileExists) {
        shell.echo(`${CONFIG_FILE_NAME} does not exist`);
        shell.exit(1);
    }

    const configurations = await scanConfigurations();

    const buildArchiveResult = shell.exec(`xcodebuild archive -workspace ${configurations.workspace} -scheme ${configurations.scheme} -configuration ${configurations.configuration} -archivePath ${configurations.archivePath}`);
    if (!buildArchiveResult) {
        shell.echo('Archive build failed');
        shell.exit(1);
    }

    const exportArchiveResult = shell.exec(`xcodebuild -exportArchive -archivePath ${configurations.archivePath} -exportPath ${configurations.exportPath} -exportOptionsPlist ${configurations.exportOptionsPlist}`);
    if (!exportArchiveResult) {
        shell.echo('Archive export failed');
        shell.exit(0);
    }

    shell.echo(`Archive succeeded, export path: ${configurations.exportPath}`);
    shell.exit(0);
};

const scanConfigurations = async (): Promise<IConfiguration> => {
    const jsonString = await readFileAsync(ConfigureFilePath);
    const configurations: IConfiguration = JSON.parse(jsonString);
    const checkin = ['workspace', 'scheme', 'exportOptionsPlist'];
    checkin.forEach(checkee => {
        if (!configurations[checkee]) {
            shell.echo(`${checkee} parameter should not be empty`);
            shell.exit(1);
        }
    });

    // 检查 iOS 原生项目目录是否存在
    configurations.iosPath = configurations.iosPath || `${process.cwd()}/ios`;
    const iosProjectExists = await testFileExists(configurations.iosPath);
    if (!iosProjectExists) {
        shell.echo(`${IOS_NATIVE_DIRECTORY} directory does not exist`);
        shell.exit(1);
    }

    // 补全后缀名
    const suffix = `.workspace`;
    if (!configurations.workspace.endsWith(suffix)) {
        configurations.workspace.concat(suffix);
    }

    // 设置默认值
    configurations.configuration = configurations.configuration || 'Release';
    configurations.archivePath = configurations.archivePath || `./${configurations.scheme}`
    configurations.exportPath = configurations.exportPath || `./archived`;

    return configurations;
};

archiveiOS();

