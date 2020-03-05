import * as fs from 'fs';
import * as rimraf from 'rimraf';
import mkdirp from 'mkdirp';

export function createDirectoryAction(dir: string): void {
    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
        if (!fs.existsSync(`${process.env.MYS3Storage}/${dir}`)) {
            return mkdirp(`${process.env.MYS3Storage}/${dir}`, err => {
                err ? console.log(err) : console.log('folder create');
            });
        }
    }
}

export function removeDirectoryAction(dir: string): void {
    if (fs.existsSync(`${process.env.MYS3Storage}`)) {
        if (fs.existsSync(`${process.env.MYS3Storage}/${dir}`)) {
            return rimraf.sync(`${process.env.MYS3Storage}/${dir}`);
        }
    }
}

export async function renameDirectoryAction(
    uuidUser: string,
    oldDir: string,
    dir: string,
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        return fs.rename(
            `${process.env.MYS3Storage}/${uuidUser}/${oldDir}`,
            `${process.env.MYS3Storage}/${uuidUser}/${dir}`,
            err => {
                if (err !== null) {
                    console.log(err);
                    return reject(false);
                } else {
                    return resolve(true);
                }
            },
        );
    });
}

export async function removeBlobAction(
    id: string, // user uuid
    blob: string, // blob path for example ./dataStorage/22...
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${process.env.MYS3Storage}`)) {
            if (fs.existsSync(`${process.env.MYS3Storage}/${id}`)) {
                rimraf.sync(`${blob}`);
                return resolve(true);
            } else {
                reject(false);
            }
        } else {
            reject(false);
        }
    });
}
