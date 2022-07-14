import "../setUp"
import { svgVisitor, setPathStrokeZeroWidth } from '../../src/index';
import { resolve } from "path";
import { readFileSync } from 'fs'
import { JSDOM } from "jsdom";
const testName = 'setPathStrokeZeroWidth'
const svgString = readFileSync(resolve(__dirname, "./svg/src.svg")).toString()
const svgStringShouldBe = readFileSync(resolve(__dirname, "./svg/shouldBe.svg")).toString()
test(testName, () => {
  const dom = new JSDOM(svgString)
  const parsedSvgDom = dom.window.document.getElementsByTagName('svg')
  if (!parsedSvgDom || !parsedSvgDom[0]) return
  const svgDom = parsedSvgDom[0]
  svgVisitor(svgDom as unknown as SVGElement, {
    pathVisitor: function (pathDom: SVGPathElement) {
      setPathStrokeZeroWidth(pathDom)
    }
  })
  expect(svgDom.outerHTML).toBe(svgStringShouldBe);
})