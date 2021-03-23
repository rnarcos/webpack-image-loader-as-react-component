import mime from 'mime';

export default (fileBuffer: Buffer, filePath: string): string => {
  const fileMimeType = mime.getExtension(filePath) ?? '';
  const fileBase64Uri = fileBuffer.toString('base64');

  return `data:${fileMimeType};base64,${fileBase64Uri}`;
};
