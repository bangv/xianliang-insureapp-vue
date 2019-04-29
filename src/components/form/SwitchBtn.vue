<template>
  <label class="switch" :class="{'on' : currentValue==1}" @click="handleSwitchState">{{text}}</label>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: "不计免赔"
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    handleSwitchState() {
      if (!this.disabled ) {
        this.currentValue = this.currentValue == 0 ? 1 : 0;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.switch {
  padding:2px 5px;
  font-size: 24px;
  color: #c6cfd7;
  border-radius: 4px;
  border: solid 1px #c6cfd7;
  &.on {
    color: #0581ff;
    border-color: #0581ff;
  }
}
</style>
