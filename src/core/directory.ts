export const createOrGetDirectory = async (handle: FileSystemDirectoryHandle, name: string): Promise<FileSystemDirectoryHandle> => {
    return await handle.getDirectoryHandle(name, {create: true});
}

export const createFullDirectory = async (handle: FileSystemDirectoryHandle, path: string): Promise<FileSystemDirectoryHandle> => {
    const parts = splitPath(path);
    let currentHandle = handle;
    for (const part of parts) {
        currentHandle = await createOrGetDirectory(currentHandle, part);
    }
    return currentHandle;
}

const clearPathText = (path: string): string => {
    return path.replace(/\/+/g, "/").replace(/\/$/, "");
}

const splitPath = (path: string): string[] => {
    return clearPathText(path).split("/");
}