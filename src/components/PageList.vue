<template>
  <div>
    {{x}}
  </div>
</template>

<script>
import client from '../ctp'

export default {
  name: 'PageList',
  data () {
    return {
      x: null
    }
  },
  methods: {
  },
  created () {
    const params = new URLSearchParams()
    params.append('where', 'container = "co-cms-pages"')
    params.append('limit', '500')
    client.get(`/custom-objects`, params)
      .then(res => (this.x = res))
      .catch(err => console.log(err))
  }
}
</script>

<style scoped>
</style>
