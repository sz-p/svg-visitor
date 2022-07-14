export const svgVisitor = function (svgDom: SVGElement, options: {
  svgVisitor?: (dom: SVGElement) => void,
  pathVisitor?: (dom: SVGPathElement) => void,
  circleVisitor?: (dom: SVGCircleElement) => void,
  rectVisitor?: (dom: SVGRectElement) => void,
  ellipseVisitor?: (dom: SVGEllipseElement) => void,
  polygonVisitor?: (dom: SVGPolygonElement) => void,
  polylineVisitor?: (dom: SVGPolylineElement) => void,
  textVisitor?: (dom: SVGTextElement) => void
}) {
  let domStack = [svgDom];
  while (domStack.length) {
    const dom = domStack.pop();
    if (!dom) continue;
    const functionKey = `${dom.tagName}Visitor`
    const fc = options[functionKey]
    if (fc && typeof fc === 'function') {
      fc(dom)
    }
    if (dom.children) {
      domStack = domStack.concat(...dom.children as unknown as Array<SVGElement>)
    }
  }
}