<template>
  <ul>
    <router-link
      v-for="item in data"
      :to="`/cinema?filmid=${item.filmId}`"
      :key="item.filmId"
      tag="li"
      class="film-item vux-1px-b">
      <img :src="item.imgUrl">
      <div>
        <h1>{{ item.filmName }}</h1>
        <p>类型：{{ item.filmType }}</p>
        <p>主演：{{ item.actor }}</p>
      </div>
    </router-link>
  </ul>
</template>

<script>
import { getFilms } from '@/api/ticket'
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    getFilms().then(res => {
      this.data = res.data
    })
  }
}
</script>

<style lang="scss" scoped>
.film-item {
  display: flex;
  padding: 0.2rem 0.4rem;
  img {
    width: 1.5rem;
    height: 2rem;
    margin-right: 0.2rem;
    flex-shrink: 0;
  }
  h1 {
    line-height: 0.6rem;
    font-size: 0.32rem;
  }
}
</style>
