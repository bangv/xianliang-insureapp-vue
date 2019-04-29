<template>
  <div id="list">
    <slot v-show="data.length>0"></slot>
    <DefaultImg v-show="data.length===0" text="暂无数据"></DefaultImg>
  </div>
</template>

<script>
import DefaultImg from './DefaultImg'
export default {
  name: 'Scroll',
  components: {
    DefaultImg
  },
  props: {
    data: Array,
    over: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  updated() {
    window.addEventListener('scroll', this.handleScroll)
    // console.log(window.screen.height)
  },
  watch: {
    over() {
      if (!this.over) {
        window.addEventListener('scroll', this.handleScroll)
        // console.log(window.screen.height)
      } else {
        window.removeEventListener('scroll')
      }
    }
  },
  methods: {
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop == 0) {
        this.$emit('latest')
      }
      if (window.screen.height + scrollTop === document.body.scrollHeight) {
        this.$emit('more')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#modal {
  display: flex;
  overflow-y: scroll;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 31;
  // width: 100%;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.6);
}
</style>
