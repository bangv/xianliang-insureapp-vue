
import Vue from 'vue'
// import mint-ui components 
import Navbar from 'mint-ui/lib/navbar'
import TabItem from 'mint-ui/lib/tab-item'
import TabContainer from 'mint-ui/lib/tab-container'
import TabContainerItem from 'mint-ui/lib/tab-container-item'
import Radio from 'mint-ui/lib/radio'
import Switch from 'mint-ui/lib/switch'
import Toast from 'mint-ui/lib/toast'
import Indicator from 'mint-ui/lib/indicator'
import MessageBox from 'mint-ui/lib/message-box'
// import this project's components
import Modal from './modal/Modal'
// import mint-ui styles
import 'mint-ui/lib/toast/style.css'
import 'mint-ui/lib/indicator/style.css'
import 'mint-ui/lib/message-box/style.css'
import 'mint-ui/lib/tab-container/style.css'
import 'mint-ui/lib/tab-item/style.css'
import 'mint-ui/lib/tab-container-item/style.css'
import 'mint-ui/lib/radio/style.css'
import 'mint-ui/lib/switch/style.css'
import 'mint-ui/lib/navbar/style.css'
// register mint-ui components
Vue.component('mt-navbar', Navbar)
Vue.component('mt-tab-item', TabItem)
Vue.component('mt-tab-container', TabContainer)
Vue.component('mt-tab-container-item', TabContainerItem)
Vue.component('mt-radio', Radio)
Vue.component('mt-switch', Switch)
// register this project's components
Vue.component('Modal',Modal)

Vue.prototype.$toast = Toast
Vue.prototype.$indicator = Indicator
Vue.prototype.$messageBox = MessageBox