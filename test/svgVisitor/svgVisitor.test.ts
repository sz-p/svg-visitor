import "../setUp"
import { svgVisitor } from '../../src/index';
import { resolve } from "path";
import { readFileSync } from 'fs'
import { JSDOM } from "jsdom";
const rectVisitorSvgString = readFileSync(resolve(__dirname, "./svg/rect-visitor-svg-src.svg")).toString()
const rectVisitorSvgStringShouldBe = readFileSync(resolve(__dirname, "./svg/rect-visitor-svg-should-be.svg")).toString()

const visitorSvgString = readFileSync(resolve(__dirname, "./svg/visitor-svg.svg")).toString()

test('rectVisitor', () => {
  const dom = new JSDOM(rectVisitorSvgString)
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
  expect(svgDom.outerHTML).toBe(rectVisitorSvgStringShouldBe);
})

test('visitor', () => {
  const dom = new JSDOM(visitorSvgString)
  const parsedSvgDom = dom.window.document.getElementsByTagName('svg')
  if (!parsedSvgDom || !parsedSvgDom[0]) return
  const svgDom = parsedSvgDom[0]
  let itemCount = 0
  svgVisitor(svgDom as unknown as SVGElement, {
    visitor: function (rectDom: Element) {
      itemCount++
    }
  })
  expect(itemCount).toBe(4);
})