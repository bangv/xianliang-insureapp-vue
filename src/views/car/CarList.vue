<template>
  <div class="car-list" v-if="carList.length>0">
    <CarCard v-for="car in carList" :key="car.carId" :car="car"></CarCard>
  </div>
  <DefaultImg text="暂无数据" v-else></DefaultImg>
</template>
<script>
import CarCard from './components/CarCard'
import DefaultImg from '@/components/share/DefaultImg'

import { mapGetters } from 'vuex'
export default {
  components: {
    CarCard,
    DefaultImg
  },
  data() {
    return {
      carList: []
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getUserCarState()
  },
  methods: {
    getUserCarState() {
      const params = {
        platformId: this.userId
      }
      this.$http.getUserCarState(params).then(res => {
        if (res.data) {
          this.carList = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.car-list {
  padding: 30px 35px;
  .car-card {
    margin-bottom: 32px;
  }
}
</style>
