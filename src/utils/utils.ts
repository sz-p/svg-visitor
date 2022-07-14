/**
 * 将Path的宽度至空 用于解决 莫名其妙的边框问题
 *
 * @param {*} dom
 */
export const setPathStrokeZeroWidth = function (dom: SVGPathElement) {
  const strokeWidth = parseInt(dom.getAttribute("stroke-width") || '1');
  const strokeOpacity = parseFloat(dom.getAttribute("stroke-opacity") || '1');
  if (strokeWidth === 0 || strokeOpacity === 0) {
    dom.setAttribute("stroke-width", "0");
    dom.setAttribute("stroke-opacity", "0");
  }
};

/**
 * 将透明度至空 解决 fill-opacity 不识别问题
 *
 * @param {*} dom
 */
export const setPathFillZerOpacity = function (dom: SVGPathElement) {
  const fillOpacity = parseFloat(dom.getAttribute('fill-opacity') || '1');
  const strokeWidth = parseInt(dom.getAttribute('stroke-width') || '1');
  if (strokeWidth === 0 && fillOpacity === 0) {
    dom.setAttribute('opacity', '0')
  }
}

/**
 * 将 text 标签中style属性中的css属性解析成svg的attr
 *
 * @param {*} dom
 */
export const setTextStyleToFont = function (dom: SVGTextElement) {
  const style = dom.style;
  const font = style.font;
  const fontStyleKey = [
    "font-style",
    "font-weight",
    "font-family",
    "font-size",
  ];
  if (font) {
    fontStyleKey.forEach((key) => {
      let value = style[key];
      if (key === "font-family") {
        // 转译后出现不必要的引号：""，影响sketch识别
        const regx = /("|")/g;
        value = value.replace(regx, "");
      }
      dom.setAttribute(key, value);
    });
  } else if (style.fontSize) {
    dom.setAttribute("font-size", style.fontSize);
  } else if (style.fontWeight) {
    dom.setAttribute("font-weight", style.fontWeight);
  } else if (style.fontFamily) {
    let value = style.fontFamily
    const regx = /("|")/g;
    value = value.replace(regx, "");
    dom.setAttribute("font-family", value);
  } else if (style.fontStyle) {
    dom.setAttribute("font-style", style.fontStyle);
  }
};

/**
 * 移除 style 属性
 *
 * @param {*} dom
 */
export const removeStyle = function (dom: SVGElement) {
  dom.removeAttribute('style')
}

/**
 * 解析并 移除 dominant-baseline 属性
 * 这里 是往下移动了 1 / 3 字号
 * 移除了 dominant-baseline 属性
 *
 * @param {*} dom
 */
export const changeDominantBaselineToTranslate = function (dom: SVGTextElement) {
  const dominantBaseline = dom.getAttribute('dominant-baseline');
  if (dominantBaseline === 'central' || dominantBaseline === 'middle') {
    const fontSize = parseFloat(dom.getAttribute('font-size') || '0');
    const offsetY = fontSize / 3
    let transform = dom.getAttribute('transform')
    if (transform && transform.includes('translate')) {
      transform = transform.replace(/translate/g, '').replace(/\(/g, '').replace(/\)/g, '')
      const transformArray = transform.split(' ')
      const newTranslate = `translate(${transformArray[0]} ${parseFloat(transformArray[1]) + offsetY})`
      dom.setAttribute('transform', newTranslate)
      dom.removeAttribute('dominant-baseline')
    } else if (transform && transform.includes('matrix')) {
      transform = transform.replace(/matrix/g, '').replace(/\(/g, '').replace(/\)/g, '')
      const matrixArray = transform.split(',')
      if (matrixArray[5] !== undefined) {
        matrixArray[5] = (parseFloat(matrixArray[5]) + offsetY).toString()
      }
      const newMatrix = `matrix(${matrixArray[0]},${matrixArray[1]},${matrixArray[2]},${matrixArray[3]},${matrixArray[4]},${matrixArray[5]})`
      dom.setAttribute('transform', newMatrix)
    }
  }
}