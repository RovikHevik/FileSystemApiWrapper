export const getFolderDialog = async (): Promise<FileSystemDirectoryHandle> => {
    return await window.showDirectoryPicker();
}