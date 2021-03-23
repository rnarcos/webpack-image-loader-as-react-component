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
