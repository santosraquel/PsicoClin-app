export function planeObject (data) {
  return JSON.parse(JSON.stringify(data))
}

export function arraySearch (prop, value, array, returnIndex) {
  let obj
  for (let i = 0; i < array.length; i++) {
    if (array[i][prop] === value) {
      obj = array[i]
      break
    }
  }
  return returnIndex ? array.indexOf(obj) : obj
}

export function getOptionsText (options, Options) {
  const text = ''
  options.forEach(({ value }) => {
    options += ', ' + Options.getText(value)
  })
  return text
}

export function getUrlParam (name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}
