<template>
  <label class=" switch-container close" 
  :class="{'switch-on' : currentValue==1}" 
  @click="handleSwitchState"
  >
    <p class="slot"></p>
    <p class="btn"></p>
  </label>
</template>

<script>
export default {
  name: "InsureSwitch",
  props: {
    value: [Number, String, Boolean],
    disabled: {
      type: Boolean,
      default: false
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
      if (!this.disabled) {
        const val = this.currentValue;
        if (typeof val == "boolean") {
          this.currentValue = !this.currentValue;
        } else {
          this.currentValue = val == 0 ? 1 : 0;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.switch-container {
  display: block;
  position: relative;
  width: 100px;
  height: 56px;
  border: 2px solid #d9d9d9;
  outline: 0;
  border-radius: 30px;
  box-sizing: border-box;
  background-color: #d9d9d9;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
  &.switch-on {
    border-color: #22aefe;
    background-color: #22aefe;
    .slot {
      border-color: #22aefe;
      background-color: #22aefe;
    }
    .btn {
      transform: translateX(45px);
    }
  }
}
.close {
  .slot {
    position: absolute;
    top: 0;
    left: 0;
    width: 96px;
    height: 52px;
    border-radius: 28px;
    background-color: #fdfdfd;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  .btn {
    position: absolute;
    top: 2px;
    left: 0;
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
}
</style>
