<template>
  <input :type="type" :placeholder="placeholder" v-model="currentValue" :maxlength="max" @input="handleValueState">
</template>

<script>
export default {
  name: "InsureInput",
  props: {
    value: String, // 值
    max: Number, // 值最大长度
    placeholder: String, // 占位文本
    secret: String,
    type: {
      type: String, // 文本框类型
      default: "text"
    }
  },
  data() {
    return {
      isInit: true // 是否为初始化（初始化有值才加*号）
    };
  },
  created() {
    // this.isInit = this.value ? true : false
  },
  computed: {
    currentValue: {
      get() {
        if (this.value) {
          let value = this.value.toUpperCase().trim().slice(0, this.max);
          // 非初始化状态，即修改编辑状态
          if (!this.isInit || !this.secret) {
            return value;
          }

          // 初始化状态
          let str = this.secret.split(",");
          let pattern = new RegExp(
            "^(\\w{" + str[0] + "})(\\w*?)(\\w{" + str[1] + "})$"
          );

          return value.replace(pattern, (str, s1, s2, s3) => {
            return s1 + new Array(s2.length + 1).join("*") + s3;
          });
        }
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    // 处理值状态
    handleValueState(e) {
      this.isInit = false;
      if (this.value <= this.max) {
        this.currentValue = e.target.value;
      }
    }
  }
  // updated: function () {
  //   this.$nextTick(function () {
  //     setTimeout(() => {
  //       this.isInit = true;
  //     },10000)

  //   })
  // }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
input {
  font-size: 26px;
  text-align: right;
}
</style>
