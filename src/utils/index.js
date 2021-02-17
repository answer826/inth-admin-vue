const files = require.context('.', false, /\.js$/)
const utils = {}

files.keys().forEach(key => {
  if (key === './index.ts') return
  utils[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default utils
