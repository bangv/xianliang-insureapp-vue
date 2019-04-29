<template>
  <div id="city">
    <div class="search flex flex-ai-c">
      <i class="iconfont">&#xe628;</i>
      <input
        type="text"
        v-model="keyword"
        list="citys"
        placeholder="请输入需要搜索的城市名"
      >
      <!-- <datalist id="citys">
        <option
          v-for="(city,index) in cityList"
          :key="index"
        >{{city.regionName}}</option>

      </datalist> -->
    </div>
    <div
      class="location-city "
      v-if="location&&!state.showSearchResult"
    >
      <p @click="selectedLocationCity">{{location.regionName}}</p>
    </div>
    <div
      class="city-list"
      v-show="!state.showSearchResult"
    >
      <dl
        v-for="(group,index) in cityGroup"
        :key="index"
      >
        <dt
          class="letter"
          :id="group.regionPlanzm"
        >{{group.regionPlanzm}}</dt>
        <dd
          v-for="city in group.regionPlanListGroup"
          :key="city.id"
          @click="selectedCity(city)"
        >{{city.regionName}}</dd>
      </dl>
    </div>
    <div
      class="letter-list"
      v-show="!state.showSearchResult"
    >
      <ul>
        <li
          v-for="(group,index) in cityGroup"
          :key="index"
        >
          <a
            @click="scrollToCityByLetter($event)"
            :class="{'active':currentLetter==group.regionPlanzm}"
          >{{group.regionPlanzm}}</a>
        </li>
      </ul>
    </div>
    <div class="city-list">
      <dd
        class="item"
        v-for="(item,index) in resultCityList"
        :key="index"
        @click="selectedCity(item)"
      >
        {{item.regionName}}
      </dd>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import { insure } from "@/utils/insure";

export default {
  name: "City",

  data() {
    return {
      keyword: "",
      currentLetter: "",
      resultCityList: [], // 搜索结果城市
      state: {
        showSearchResult: false
      }
    };
  },
  computed: {
    ...mapGetters({
      cityGroup: "CITYS",
      location: "LOCATION_CITY"
    })
  },
  watch: {
    keyword(val) {
      if (!val) {
        return (this.state.showSearchResult = false);
      }
      insure.matchCity(this.cityGroup, val).then(city => {
        // this.selectedCity(city);
        if (city) {
          this.resultCityList = [city];
          this.state.showSearchResult = true;
        }
      });
    }
  },
  mounted() {
    this.$store.dispatch("getLocation");
  },

  methods: {
    /**
     * @description 点击字母滚动到对应城市
     */
    scrollToCityByLetter(e) {
      this.currentLetter = e.target.innerHTML;
      const offsetTop = document.querySelector(`#${e.target.innerHTML}`)
        .offsetTop;
      window.pageYOffse = document.documentElement.scrollTop = document.body.scrollTop = offsetTop;
    },

    selectedLocationCity() {
      this.selectedCity(this.location);
    },
    // 选中城市后
    selectedCity(city) {
      this.state.showSearchResult = false;
      this.$store.commit("SET_CITY", city);
      this.$store.commit("SET_MARK_INFO", {
        regionCode: city.regionCode,
        companyCode: city.source,
        cityAbbr: city.licensePrefix
      });
      this.$router.push({
        name: this.$route.query.referer
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#city {
  padding-bottom: 20px;
  font-size: 28px;
  background-color: #f5f5f5;
  .search {
    margin: 30px 40px;
    border-radius: 4px;
    background-color: #fff;
    input {
      width: 100%;
      height: 80px;
      padding-left: 15px;
      border-radius: 4px;
    }
    .iconfont {
      padding-left: 20px;
      font-size: 30px;
    }
  }
  .location-city {
    padding: 30px 0;
    span {
      display: block;
    }
    img {
      width: 36px;
      height: 36px;
      vertical-align: sub;
    }
    p {
      display: inline-block;
      margin: 0 10px;
      padding: 0 60px;
      line-height: 90px;
      border: 1px solid #f0f0f0;
      background-color: #fff;
      &:active {
        background-color: #ddd;
      }
    }
  }

  .city-list {
    background-color: #fff;
    dt {
      // height: 30px;
      padding-left: 30px;
      line-height: 60px;
      background-color: #f5f5f5;
    }
    dd {
      padding-left: 30px;
      // height: 60px;
      line-height: 90px;
      border-bottom: 1px solid #f5f5f5;
      &:last-of-type {
        border-bottom: none;
      }
      &:active {
        background-color: #ddd;
      }
    }
  }
  .letter-list {
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    ul {
      text-align: center;
    }
    li {
      padding: 10px 0;
    }
    a {
      padding: 10px 6px 10px 30px;
      color: #027cff;
      &.active {
        font-weight: bold;
        font-size: 30px;
      }
    }
  }
}
</style>
