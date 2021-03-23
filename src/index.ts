import { loader as WebpackLoader } from 'webpack';
import {
  generateURI,
  generateJSXFromFile,
  generateFileModule,
  transformJSX,
} from './utils';

export default function (
  this: WebpackLoader.LoaderContext,
  fileBuffer: Buffer,
) {
  const { resourcePath: filePath } = this;
  const generatedFileURI = generateURI(fileBuffer, filePath);
  const generatedJSX = generateJSXFromFile(fileBuffer, filePath);
  const generatedFileModule = generateFileModule(
    generatedFileURI,
    generatedJSX,
  );
  const transformedFileModule = transformJSX(generatedFileModule);

  return transformedFileModule ?? fileBuffer;
}

export const raw = true;
