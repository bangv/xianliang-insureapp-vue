


/**
 * @description 判断客户端环境
 */
const baseUrl = process.env.BASE_URL
export const ua = {
    isWeChat: (/micromessenger/gi).test(navigator.userAgent), // micromessenger||MicroMessenger
    isMobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry/gi).test(navigator.userAgent),
    isiOS: (/iPhone|iPad|iPod/gi).test(navigator.userAgent),
    isAndroid:
        navigator.userAgent.includes('Android') ||
        navigator.userAgent.includes('Adr')
}

export const storage = {
    /**
     * @description 通过键获取值
     * @param {String} key 键
     * @return {String} 返回该键所对应的值
     */
    getItem(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    /**
     * @description 设置值
     * @param {String} key 键
     * @param {String} value 对该键设置值
     */
    setItem(key, value) {
        value && localStorage.setItem(key, JSON.stringify(value))
    },
    /**
     * @description 通过键获取值
     * @param {String} key 键
     * @return {String} 返回该键所对应的值
     */
    removeItem(key) {
        localStorage.removeItem(key)
    },
    clear() {
        localStorage.clear()
    }
}

export const session = {
    /**
   * @description 通过键获取值
   * @param {String} key 键
   * @return {String} 返回该键所对应的值
   */
    getItem(key) {
        return JSON.parse(sessionStorage.getItem(key))
    },
    /**
     * @description 设置值
     * @param {String} key 键
     * @param {String} value 对该键设置值
     */
    setItem(key, value) {
        value && sessionStorage.setItem(key, JSON.stringify(value))
    },
    /**
     * @description 通过键获取值
     * @param {String} key 键
     * @return {String} 返回该键所对应的值
     */
    removeItem(key) {
        sessionStorage.removeItem(key)
    },
    clear() {
        sessionStorage.clear();
    }
}

export const cookie = {
    /**
     * @description 设置 cookie
     * @param {String} key 键
     * @param {String} value 值
     * @param {Number} time 过期时间(秒)
     */
    setItem(key, value, time) {
        const date = new Date()
        date.setTime(date.getTime() + time * 1000)
        document.cookie = `${key}=${escape(
            value
        )};expires=${date.toUTCString()};path=${baseUrl}`
    },
    /**
     * @description 获取 cookie
     * @param {String} key 键
     */
    getItem(key) {
        let name = key + '='
        let ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i].trim()
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
        }
        return ''
    },
    /**
     * @description 删除 cookie
     * @param {String} key 键
     */
    removeItem(key) {
        this.setItem(key, null, -1 * 24 * 60 * 60)
    }
}


/**
 * @description url 处理
 */
export const url = {
    /**
     * @description 返回参数对象
     * @param {*} url
     */
    getQueryObj(url) {
        let obj = {}
        let keyvalue = []
        let key = ''
        let value = ''
        var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&')
        for (let i in paraString) {
            keyvalue = paraString[i].split('=')
            key = keyvalue[0]
            value = keyvalue[1]
            obj[key] = value
        }
        return obj
    }
}

export const platform = {
    // 1：微信  2：app  3：h5
    type() {
        if (ua.isWeChat) {
            return 1
        } else if (storage.getItem('INSURE_WEBVIEW')) {
            return 3
        } else {
            return 2
        }
    }
}
