export const writeContent = async (handle: FileSystemFileHandle, content: Blob): Promise<void> => {
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
}

export const writeContentFromUrl = async (handle: FileSystemFileHandle, url: string, header: HeadersInit = null): Promise<void> => {
    // fetch with header if they are provided
    const response = await fetch(url, {headers: header});
    const content = await response.blob();
    await writeContent(handle, content);
}

export const writeCustomContent = async (handle: FileSystemFileHandle, content: any, contentType: string): Promise<void> => {
    const blob = new Blob([content], {type: contentType});
    await writeContent(handle, blob);
}

export const writeContentFromString = async (handle: FileSystemFileHandle, content: string): Promise<void> => {
    await writeContent(handle, new Blob([content]));
}