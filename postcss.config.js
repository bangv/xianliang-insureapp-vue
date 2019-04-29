module.exports = {
  plugins: {
    // "postcss-import": {},
    "precss": {},
    // "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-px-to-viewport-opt": {
      viewportWidth: 750, // (Number) The width of the viewport.
      viewportHeight: 1334, // (Number) The height of the viewport. 
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to. 
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px. 
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace. 
      mediaQuery: false,// (Boolean) Allow px to be converted in media queries.
      exclude: /(\/|\\)(node_modules)(\/|\\)/
    },
    "postcss-viewport-units": {
      filterRule: rule => rule.nodes.findIndex(i => i.prop === 'content') === -1
    }
    // https://zhuanlan.zhihu.com/p/36913200
  }
}
