<template>
</template>

<script>
import { storage, ua } from "@/utils/browser";
export default {
  data() {
    return {};
  },

  created() {
    if (ua.isWeChat) {
      return this.$router.replace({
        name: "WeChat",
        query: { end: this.$route.query.end }
      });
    }
    // B 端(业务员)
    if (this.$route.query.end == "sales") {
      this.$router.replace({ name: "SignIn" });
    } else {
      this.$router.replace({ name: "Login" }); // C 端
    }
  },

  methods: {
    /**
     * @description 缓存webview平台标识
     */
    handleWebview() {
      let platformType = this.$route.query.type;
      // console.log(platformType)
      if (platformType) {
        storage.setItem("INSURE_WEBVIEW", platformType);
      }
    }
  }
};
</script>
