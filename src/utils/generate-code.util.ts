import mime from 'mime';

function generateJSXFromSVG(svg: string): string {
  const svgWithProps = svg.replace(/<svg(.*?)>/, '<svg$1 {...props}>');

  return `
    (function(props) {
      return ${svgWithProps};
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
    var imagePath = ${fileURI};

    Object.defineProperty(exports, "__esModule", { value: true });

    exports.default = ${jsx};
    exports.path = imagePath;
  `;
}
