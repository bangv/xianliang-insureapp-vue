<template>
  <TipModal @hide="hideModal">
    <div id="reason-modal">
      <h2>以下<i class="blues">{{plan['source']|companyName}}</i>保司因承保规则，说明如下:</h2>
      <p v-for="(reason,index) in plan['reason']" :key="index">
        {{reason}}
      </p>
    </div>
  </TipModal>

</template>

<script>
import TipModal from '@/components/modal/TipModal'
export default {
  components: {
    TipModal
  },
  props: {
    plan: Object
  },
  methods: {
    hideModal() {
      this.$parent.state.showReasonModal = false;
    }
  }
};
</script>
<style lang="scss" scoped>
#reason-modal {
  padding-top: 30px;
  text-align: center;
  h2 {
    margin-bottom: 30px;
    font-size: 24px;
  }
  p {
     margin-bottom: 10px;
    font-size: 28px;
  }
}
</style>
