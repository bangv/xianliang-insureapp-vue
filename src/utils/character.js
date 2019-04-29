/**
 * @description 字符串处理
 */
import jsSHA from 'jssha'

export const character = {
    replaceAll(str, search, replacement) {
        return str.split(search).join(replacement)
    },

    /**
     * @description 生成随机字符串
     * @return {String}
     */
    random() {
        return Math.random()
            .toString(36)
            .substr(2, 15)
    },
    /**
     * @description sha 加密
     * @param {String} str 需要加密的字符串
     * @return {Object} 加密后的结果对象
    */
    sha(str) {
        return new jsSHA(str, 'TEXT')
    },
    /**
    *
    * @param {Number|String} arg1 运算数字
    * @param {Number|String} arg2 运算数字
    * @param {String}} symbol 运算符
    */
    //http://www.css88.com/archives/7340
    operation(arg1, arg2, symbol) {
        if ((arg1 || arg1 == 0) && (arg2 || arg2 == 0) && symbol) {
            var result
            switch (symbol) {
                case '+':
                    result = (+arg1 + +arg2).toFixed(10)
                    break
                case '-':
                    result =(+arg1 - +arg2).toFixed(10)
                    break
                case '*':
                    result =(+arg1 * +arg2).toFixed(10)
                    break
                case '/':
                    result = (+arg1 / +arg2).toFixed(10)
                    break
            }
            return parseFloat(result)
        }
    }
}