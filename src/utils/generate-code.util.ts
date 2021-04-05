import mime from 'mime';
import HTMLtoJSX from 'htmltojsx';

function generateJSXFromSVG(SVG: string): string {
  const parsedSVG = new HTMLtoJSX({ createClass: false }).convert(SVG);

  const SVGWithProps = parsedSVG.replace(/<svg(.*?)>/, '<svg$1 {...props}>');
  return `
    (function(props) {
      return ${SVGWithProps};
    });
  `;
}

function generateJSXFromRasterImages(): string {
  return `
    (function(props) {
      var imageProps = Object.assign({}, props, { src: imagePath });

      return <img {...imageProps} />
    });
  `;
}

export function generateJSXFromFile(
  fileBuffer: Buffer,
  filePath: string,
): string {
  const fileMimeType = mime.getType(filePath) ?? '';
  const fileExtension = mime.getExtension(fileMimeType);

  if (fileExtension === 'svg') {
    return generateJSXFromSVG(fileBuffer.toString('utf-8'));
  }
  return generateJSXFromRasterImages();
}

export function generateFileModule(fileURI: string, jsx: string): string {
  return `
    var React = require('react');
    var imagePath = ${JSON.stringify(fileURI)};

    Object.defineProperty(exports, "__esModule", { value: true });

    exports.default = ${jsx};
    exports.path = imagePath;
  `;
}
