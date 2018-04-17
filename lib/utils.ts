import { exists, readFile } from 'fs';

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

/**
 * 读取文件，支持 async/await
 * @param path 文件路径
 */
export const readFileAsync = async (path: string): Promise<string> => {
    return new Promise<string>((resovle, reject) => {
        readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resovle(data);
            }
        })
    });
};
