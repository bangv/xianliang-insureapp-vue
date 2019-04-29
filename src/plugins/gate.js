let results = []

function initValidate(name, value, options) {
  let option = options[name]
  let result = {
    name: name,
    message: null
  }
  if (!value) {
    result.message = option.requiredMsg
  } else {
    if (!option.pattern.test(value)) {
      result.message = option.invalidMsg
    }
  }
  results.push(result)
  // console.log(results)
}

function changeValidate(name, value, options) {
  let option = options[name]

  results.map(item => {
    if (item.name === name) {
      if (!value) {
        item.message = option.requiredMsg
      } else {
        if (option.pattern.test(value)) {
          item.message = null
        } else {
          item.message = option.invalidMsg
        }
      }
    }
  })

  // console.log(results)
}

export default {
  install(Vue, options) {
    Vue.directive('gate', {
      bind(el, binding, vnode, oldVnode) {
        let expression = binding.expression.replace(/'/g, '')
        if (expression && expression.includes('|')) {
          let params = expression.split('|')
          let required = params[0]
          let name = params[1]
          if (required === 'required') {
            initValidate(name, el.value, options)
          }
        }
      },
      update: function (el, binding, vnode, oldVnode) {
        let value = vnode.data.domProps.value
        let oldValue = oldVnode.data.domProps.value
        if (value !== oldValue) {
          let expression = binding.expression.replace(/'/g, '')
          if (expression && expression.includes('|')) {
            let params = expression.split('|')
            let required = params[0]
            let name = params[1]
            if (required === 'required') {
              changeValidate(name, el.value, options)
            }
          }
        }
      },
      unbind: function () { }
    })
    Vue.prototype.$gate = {
      /**
       * @description 返回单项验证结果错误信息
       * @param {String} type 该项在错误信息配置中的名字
       */
      validate: type => {
        return new Promise(resolve => {
          for (let i = 0; i < results.length; i++) {
            if (results[i].name === type) {
              resolve(results[i])
            }
          }
        })
      },
      validateAll: () => {
        return new Promise(resolve => {
          resolve(results)
        })
      }
    }
  }
}
