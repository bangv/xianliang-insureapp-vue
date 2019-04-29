<template>
  <div class="track-card" v-if="track">
    <div class="card-left">
      <p class="date"> {{track.poweron_time}} - {{track.poweroff_time}}</p>
      <p class="start">
        <i></i>{{track.start}}</p>
      <p class="end">
        <i></i>{{track.end}}</p>
    </div>
    <div class="card-right" @click="viewTrack">
      <img :src="$baseUrl+'icon/track_path.png'">
      <span>查看轨迹</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    track: Object
  },

  methods: {
    viewTrack() {
      // status-> 0：未生成 1：已生成
      if (!this.track.status || this.track.status == 0) {
        this.$toast("轨迹暂未生成，请稍后再试");
      } else {
        this.$router.push({
          name: "TrackDetail",
          params: {
            trackId: this.track.id
          },
          query: {
            startAddr: encodeURI(this.track.start),
            endAddr: encodeURI(this.track.end),
            startTime: this.track.poweron_time,
            endTime: this.track.poweroff_time
          }
        });
        // window.location.href = `https://www.meirichexian.com/templates/${url}`
        // window.location.href = `https://test1.meirichexian.com/templates/${url}`
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.track-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  margin: 0 24px;
  border-radius: 9px;
  background-color: #fff;
  p {
    margin-bottom: 32px;
  }

  .card-right {
    text-align: center;
    img {
      width: 55px;
      height: 55px;
    }
    span {
      display: block;
      color: #838383;
    }
  }
  i {
    width: 18px;
    height: 18px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .card-left {
    flex: 1;
    // max-width: 95%;
  }
  .start {
    i {
      background-color: #0093ff;
    }
  }
  .end {
    margin-bottom: 0;
    i {
      background-color: #ff9d46;
    }
  }
}
</style>
