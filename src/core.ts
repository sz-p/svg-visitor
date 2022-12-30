export const svgVisitor = function (svgDom: SVGElement, options: {
  visitor?: (dom: Element) => void,
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
    const visitor = options.visitor
    if (fc && typeof fc === 'function') {
      fc(dom)
    }
    if (typeof visitor === 'function') {
      visitor(dom)
    }
    if (dom.children) {
      domStack = domStack.concat(...dom.children as unknown as Array<SVGElement>)
    }
  }
}