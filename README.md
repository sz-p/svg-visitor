# svg-visitor

visit svg element use [visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern)


# Install
```shell
npm install svg-visitor
```
# Usage
```javascript
import { svgVisitor } from 'svg-visitor';

const svgDom = document.getElementByTagName('svg')[0]

svgVisitor(svgDom, {
  rectVisitor: function (rectDom) {
    const fill = rectDom.getAttribute('fill')
    if (fill === '#f00') {
      rectDom.setAttribute('fill', "#0f0")
    }
  }
})
```

before

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="40" height="40" >
<rect width="40" height="40" x="0" y="0" id="0" fill="#f00"></rect>
</svg>

after

<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" width="40" height="40" >
<rect width="40" height="40" x="0" y="0" id="0" fill="#0f0"></rect>
</svg>

# Test

```shell
npm run-script test
```