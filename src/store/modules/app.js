import { storage } from '@/utils/browser'

let state = {
    platformType: storage.getItem('INSURE_WEBVIEW'), // webview 平台,
}

const getters = {
    platformType: state => state.platformType,
}

// const actions = {
//     // 获取客户端类型
//     getPlatformType({ state, commit }) {
//         window.app.getSysType('')
//         window.location.href = 'getSysType:'
//     }
// }

// const mutations = {
//     setClientType(state, data) {
//         state.clientType = data
//     },
// }

export default {
    state,
    getters,
    // actions,
    // mutations
}
