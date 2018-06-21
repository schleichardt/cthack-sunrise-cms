<template>
  <div>
    <global-errors :errors="errors"/>
    <div v-if="!pageQueryResult" class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
    </div>
    <table v-if="pageQueryResult" class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">key</th>
          <th scope="col">createdA</th>
          <th scope="col">updatedAt</th>
          <th scope="col">dependencies</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(page, index) in pageQueryResult.results" :key="page.key">
          <th scope="row">{{index + 1}}</th>
          <td>{{page.key}}</td>
          <td>{{page.createdAt}}</td>
          <td>{{page.lastModifiedAt}}</td>
          <td>{{page.value.dependencies.length}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import client from '../ctp'

export default {
  name: 'PageList',
  data () {
    return {
      pageQueryResult: null,
      errors: []
    }
  },
  methods: {
  },
  created () {
    const params = new URLSearchParams()
    params.append('where', 'container = "co-cms-pages"')
    params.append('limit', '500')
    params.append('expand', 'value.dependencies[*]')
    client.get(`/custom-objects`, params)
      .then(res => (this.pageQueryResult = res.data))
      .catch(err => this.errors.push(err))
  }
}
</script>

<style scoped>
</style>
