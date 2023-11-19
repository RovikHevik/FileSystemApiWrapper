import {getFolderDialog} from "./core/dialog";
import {createFullDirectory, createOrGetDirectory} from "./core/directory";
import {createAndWriteFile, createFile} from "./core/file";

export class Core {
    root: FileSystemDirectoryHandle;
    constructor(isInit: boolean) {
        if (isInit) {
            this.init().catch((err) => {
                throw err;
            });
        }
    }
    async init() {
        this.root = await getFolderDialog();
    }

    async createOrGetDirectory(path: string): Promise<FileSystemDirectoryHandle> {
        return await createOrGetDirectory(this.root, path);
    }

    async createFullDirectory(path: string): Promise<FileSystemDirectoryHandle> {
        return await createFullDirectory(this.root, path);
    }

    async createFile(fileName: string): Promise<FileSystemFileHandle> {
        return await createFile(this.root, fileName);
    }

    async createAndWriteFile(fileName: string, content: any, contentType: string = null, header: HeadersInit = null): Promise<void> {
        return await createAndWriteFile(this.root, fileName, content, contentType, header);
    }
}