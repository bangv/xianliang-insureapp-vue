<template>
  <div id="modal" @click="hideModal($event)" :style="{background:background}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['background'],
  computed: {},
  methods: {
    hideModal(e) {
      if (e.target.id === 'modal') {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#modal {
  display: flex;
  align-items: center;
  justify-content: center;
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
