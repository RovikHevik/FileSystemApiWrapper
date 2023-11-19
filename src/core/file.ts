import {writeContent, writeContentFromString, writeContentFromUrl, writeCustomContent} from "./writer";

export const createFile = async (handle: FileSystemDirectoryHandle, name: string): Promise<FileSystemFileHandle> => {
     if (!checkFileName(name)) {
            throw new Error("Invalid file name");
     }
     return await handle.getFileHandle(name, { create: true });
}

export const createAndWriteFile = async (handle: FileSystemDirectoryHandle, name: string, content: any, contentType: string = null, header: HeadersInit = null): Promise<void> => {
     const fileHandle = await createFile(handle, name);

     if(content instanceof Blob) {
          await writeContent(fileHandle, content);
     }
     else if (content.contains("http")) {
          await writeContentFromUrl(fileHandle, content, header);
     }
     else if(typeof content === "string") {
          await writeContentFromString(fileHandle, content);
     }
     else {
          await writeCustomContent(fileHandle, content, contentType);
     }
}

const checkFileName = (name: string): boolean => {
     const regex = /^[^\\/?%*:|"<>.]+$/;
     return regex.test(name);
}