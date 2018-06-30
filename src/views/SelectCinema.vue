<template>
  <ul>
    <router-link
      v-for="item in data"
      :to="{
        path:'/theaters',
        query:{
          filmid:$route.query.
          filmid,cid:item.cinemaId}
      }"
      :key="item.cinemaId"
      tag="li"
      class="cinema vux-1px-b">
      <img :src="item.imgUrl">
      <div>
        <h1>{{ item.cinemaName }}</h1>
        <p>影院地址：{{ item.address }}</p>
      </div>
    </router-link>
  </ul>
</template>

<script>
import { getCinemas } from '@/api/ticket'
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    getCinemas({ mid: this.$route.query.filmid }).then(res => {
      this.data = res.data.cinemas
    })
  }
}
</script>

<style lang="scss" scoped>
.cinema {
  padding: 0.2rem 0.4rem;
  display: flex;
  align-items: center;
  min-height: 1.6rem;
  img {
    width: 1.7rem;
    height: 1rem;
    margin-right: 0.2rem;
    flex-shrink: 0;
  }
  h1 {
    line-height: 0.6rem;
    font-size: 0.32rem;
  }
}
</style>
