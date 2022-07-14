import "../setUp"
import { svgVisitor } from '../../src/index';
import { resolve } from "path";
import { readFileSync } from 'fs'
import { JSDOM } from "jsdom";
const testName = 'svgVisitor'
const svgString = readFileSync(resolve(__dirname, "./svg/src.svg")).toString()
const svgStringShouldBe = readFileSync(resolve(__dirname, "./svg/shouldBe.svg")).toString()
test(testName, () => {
  const dom = new JSDOM(svgString)
  const parsedSvgDom = dom.window.document.getElementsByTagName('svg')
  if (!parsedSvgDom || !parsedSvgDom[0]) return
  const svgDom = parsedSvgDom[0]
  svgVisitor(svgDom as unknown as SVGElement, {
    rectVisitor: function (rectDom: SVGRectElement) {
      const fill = rectDom.getAttribute('fill')
      if (fill === '#f00') {
        rectDom.setAttribute('fill', "#0f0")
      }
    }
  })
  expect(svgDom.outerHTML).toBe(svgStringShouldBe);
})