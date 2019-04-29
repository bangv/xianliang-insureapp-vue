<template>
  <Modal @hide="hideModal">
    <transition enter-active-class="animated fadeInUp">
      <div class="type-list">
        <!-- <h3 class="list-header">请选择品牌型号</h3> -->
        <ul class="list-content">
          <li v-for="(item,index) in list" :key="index" @click="selected(item)">
            <span :class="{'active':item.vehicleNo==code}">{{item.info|friendlyCarType}} {{item.purchasePrice}}元</span>
          </li>
          <li v-if="list.length===0">未查询到相关车型信息</li>
        </ul>
      </div>
    </transition>
  </Modal>
</template>
<script>
export default {
  props: {
    show: Boolean,
    list: Array,
    code: String
  },
  methods: {
    selected(item) {
      this.$emit('selected', item)
    },
    hideModal() {
      this.$parent.state.showCarTypeSheetModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.type-list {
  position: fixed;
  z-index: 30;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background-color: #fff;
  // .list-header {
  //   font-size: 28px;
  //   padding: 20px;
  //   border-bottom: 1px solid #e5e5e5;
  // }
  .list-content {
    overflow-y: scroll;
    max-height: 100%;
    font-size: 24px;

    li {
      padding: 20px;
      text-align: justify;
      border-bottom: 1px solid #e5e5e5;
    }
    li:last-of-type {
      border-bottom: none;
    }
    .active {
      color: #007aff;
    }
  }
}
</style>
