/**
 * @param {string} url
 * @returns {Object}
 */
const param2Obj = (url) => {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 对象转formData
const obj2FormData = (obj) => {
  const form = new FormData()
  for (const key in obj) {
    form.append(key, obj[key])
  }
  return form
}

// 对象转参数字符串
const obj2ParamsStr = (params) => {
  let paramsStr = ''
  for (const key in params) {
    if (params[key] === '') continue
    paramsStr += (paramsStr === '' ? '?' : '&') + key + `=${params[key]}`
  }
  return paramsStr
}

export default {
  obj2FormData,
  obj2ParamsStr,
  param2Obj
}
