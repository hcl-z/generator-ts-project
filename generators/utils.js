// 数组转首字母大写数组
function transformChoicesArr(arr) {
  return arr.map((item) => {
    return {
      name: item.charAt(0).toUpperCase() + item.slice(1),
      value: item,
    }
  })
}

class GeneratorStore {
  constructor(store = {}) {
    this.store = store
    this.field = ''
  }

  setField(field) {
    this.field = field
  }

  merge(store) {
    for (const key in store) {
      this.set(key, store[key])
    }
  }

  set(keyPath, value) {
    const keys = Array.isArray(keyPath) ? keyPath : keyPath.split('.')
    if (this.field) {
      keys.unshift(this.field)
    }

    let current = this.store

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!current[key]) {
        current[key] = {}
      }

      current = current[key]
    }

    const target = current[keys[keys.length - 1]]
    if (Array.isArray(target)) {
      current[keys[keys.length - 1]] = [...new Set(target.concat(value))]
    }
    else {
      current[keys[keys.length - 1]] = value
    }
  }

  get(keyPath) {
    if (!keyPath) {
      return this.store
    }

    const keys = Array.isArray(keyPath) ? keyPath : keyPath.split('.')
    if (this.field) {
      keys.unshift(this.field)
    }

    let current = this.store

    for (const key of keys) {
      if (!key) {
        continue
      }

      // eslint-disable-next-line no-prototype-builtins
      if (current && current.hasOwnProperty(key)) {
        current = current[key]
      }
      else {
        return undefined
      }
    }

    return current
  }

  delete(keyPath) {
    const keys = Array.isArray(keyPath) ? keyPath : keyPath.split('.')
    let current = this.store

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      // eslint-disable-next-line no-prototype-builtins
      if (current && current.hasOwnProperty(key)) {
        current = current[key]
      }
      else {
        return
      }
    }

    delete current[keys[keys.length - 1]]
  }
}
const store = new GeneratorStore({ generatorJSON, handleKeywords })

function generatorJSON(field) {
  const storeArr = Object.entries(store.get(field) || {})
  console.log('field', field, storeArr)
  return storeArr.reduce((acc, [key, value], index) => {
    const isLast = index === storeArr.length - 1
    acc += `"${key}": "${value}"${isLast ? '' : ','}\n`
    return acc
  }, '')
}

function handleKeywords() {
  const keyWordStr = store.get('keywords')
  return JSON.stringify(keyWordStr.split(/\s+/) || [])
}
function setDependency(dep, version) {
  store.set(['dependencies', dep], version)
}

function setDevDependency(dep, version) {
  store.set(['devDependencies', dep], version)
}

function setScript(name, script) {
  store.set(['scripts', name], script)
}

function setInstallDevpendency(dep, type) {
  if (type === 'S') {
    store.set('installDependencies', [dep])
  }
  else {
    store.set('installDevDependencies', [dep])
  }
}

exports.transformChoicesArr = transformChoicesArr

module.exports = {
  store,
  transformChoicesArr,
  setDependency,
  setDevDependency,
  setScript,
  setInstallDevpendency,
}
