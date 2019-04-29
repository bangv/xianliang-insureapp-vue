<template>
  <div class="interface-modal" v-show="show">
    <TipModal @hide="hideModal" title="接口位置实拍图" :line="false">
      <img :src="`${baseUrl}images/interface-guide.jpg`" alt="">
    </TipModal>
  </div>
</template>
<script>
import TipModal from '@/components/modal/TipModal'
export default {
  name: 'InterfaceModal',
  components: {
    TipModal
  },
  props: {
    show: Boolean
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    }
  }
}
</script>
<style lang="scss" scoped>
.obd-modal {
  width: 100%;
}
</style>
