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
          <td><router-link :to="{ name: 'PageEditor', params: { pageKey: page.key }}">{{page.key}}</router-link></td>
          <td><date-time :data="page.createdAt"></date-time></td>
          <td><date-time :data="page.lastModifiedAt"></date-time></td>
          <td>{{page.value.dependencies ? page.value.dependencies.length : 0}}</td>
          <td><button type="button" class="btn btn-outline-danger" @click="deletePage(page)">Delete</button></td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td><input type="text" class="form-control" v-model="newPageKey" placeholder="new page"></td>
          <td></td>
          <td></td>
          <td></td>
          <td><button type="button" class="btn btn-primary" @click="createPage">Create</button></td>
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
      newPageKey: null,
      errors: []
    }
  },
  methods: {
    createPage: function () {
      const customObjectDraft = {
        container: 'co-cms-pages',
        key: this.newPageKey,
        value: {
          content: {},
          dependencies: []
        }
      }
      client.post('/custom-objects', customObjectDraft)
        .then(res => {
          this.$router.push({name: 'PageEditor', params: {pageKey: this.newPageKey}})
        })
        .catch(err => this.errors.push(err))
    },
    deletePage: function (page) {
      client.delete(`/custom-objects/co-cms-pages/${page.key}`)
        .then(res => {
          const params = new URLSearchParams()
          params.append('where', 'container = "co-cms-pages"')
          params.append('limit', '500')
          params.append('expand', 'value.dependencies[*]')
          client.get(`/custom-objects`, params)
            .then(res => (this.pageQueryResult = res.data))
        })
        .catch(err => this.errors.push(err))
    }
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
