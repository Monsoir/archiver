export const NEEDED_COMMAND = 'xcodebuild'; // 命令
export const CONFIG_FILE_NAME = '.archive.json'; // 配置文件
export const IOS_NATIVE_DIRECTORY = 'ios'; // iOS 原生项目目录

export interface IConfiguration {
    xcworkspace: string;
    scheme: string;
    configuration: string;
    archiveDirecotory: string;
    archiveFileName: string;
    exportPath: string;
    exportOptionsPlist: string;
    iosPath: string;
    [key: string]: string;
}
