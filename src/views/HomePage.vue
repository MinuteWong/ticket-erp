<template>
  <ul>
    <li
      v-for="item in data"
      :key="item.filmId">
      <img :src="item.imgUrl">
      {{ item.filmName }}
    </li>
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

<style>
</style>
