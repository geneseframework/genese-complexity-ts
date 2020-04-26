export function getFileName(filePath = ''): string {
    const splittedPath = filePath.split('/');
    return splittedPath[splittedPath.length - 1];
}
