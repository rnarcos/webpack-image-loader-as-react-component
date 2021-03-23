function generateJSXFromSVG(svg: string): string {
  const svgWithProps = svg.replace(/<svg(.*?)>/, '<svg$1 {...props}>');

  return `
    (function(props) {
      return ${svgWithProps};
    });
  `;
}
