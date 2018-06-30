<template>
  <div>
    11
  </div>
</template>

<script>
import { getTheaters } from '@/api/ticket'
export default {
  data () {
    return {
      data: []
    }
  },
  created () {
    const query = this.$route.query
    getTheaters({ mid: query.filmid, cinemaid: query.cid }).then(res => {})
  }
}
</script>

<style lang="scss" scoped>
</style>
