import { exists } from 'fs';

/**
 * 检查文件是否存在，支持 async/await
 * @param path 文件路径
 */
export const testFileExists = async (path: string): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
        exists(path, (result) => {
            resolve(result);
        });
    });
};
