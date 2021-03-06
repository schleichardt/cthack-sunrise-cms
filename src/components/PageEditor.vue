<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Pages List</a>
    </nav>
    <div class="container">
      <h1>{{key}}</h1>
      <global-errors :errors="errors" :successes="successes" />

      <div v-if="loaded">

        <button type="button" class="btn btn-primary" @click="save">Save</button>
        <v-json-editor v-if="loaded"
                       :data="customObjectValue.content"
                       :editable="true"
                       @change="$forceUpdate()"></v-json-editor>
        <button type="button" class="btn btn-primary" @click="save">Save</button>

        <div v-if="customObjectValue">
          <h2>Dependencies</h2>
          <div v-for="dependencyId in possibleDependencies" :key="dependencyId" class="form-check">
            <input v-model="dependencyIds" :value="dependencyId" class="form-check-input" type="checkbox" :id="'check-dep-' + dependencyId">
            <label class="form-check-label" :for="'check-dep-' + dependencyId">
              {{pagesIdToObjectMap[dependencyId].key}}
            </label>
          </div>
          <button type="button" class="btn btn-primary" @click="save">Save</button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import client from '../ctp'
export default {
  name: 'PageEditor',
  data () {
    return {
      key: this.$route.params.pageKey,
      dependencyIds: [],
      loaded: false,
      customObjectValue: {
        content: {},
        dependencies: []
      },
      otherPagesQueryResult: null,
      pagesIdToObjectMap: {},
      errors: [],
      successes: []
    }
  },
  computed: {
    possibleDependencies () {
      const unsortedResult = this.otherPagesQueryResult ? this.otherPagesQueryResult.results.map(d => d.id) : []
      return unsortedResult.sort()
    }
  },
  watch: {
    dependencyIds (newValue) {
      this.customObjectValue.dependencies = newValue.map(id => this.pagesIdToObjectMap[id])
    }
  },
  methods: {
    save: function () {
      const draftBody = JSON.parse(JSON.stringify(this.customObjectValue))
      draftBody.dependencies = this.dependencyIds.map(id => {
        return {
          id,
          typeId: 'key-value-document'
        }
      })
      const customObjectDraft = {
        container: 'co-cms-pages',
        key: this.key,
        value: draftBody
      }
      client.post(`/custom-objects`, customObjectDraft)
        .then(res => {
          // do not do this, this kills the JSON editor
          // this.$set(this, 'customObjectValue', res.data.value)
          this.successes.push('pushed changes')
        })
        .catch(err => this.errors.push(err))
    },
    loadData () {
      this.loadPageCustomObject()
      this.loadOtherPages()
    },
    loadPageCustomObject () {
      const params = new URLSearchParams()
      params.append('expand', 'value.dependencies[*]')
      client.get(`/custom-objects/co-cms-pages/${this.key}`, params)
        .then(res => {
          this.$set(this, 'customObjectValue', res.data.value)
          this.dependencyIds = res.data.value.dependencies.map(d => d.id)
          this.loaded = true
        })
        .catch(err => this.errors.push(err))
    },
    loadOtherPages () {
      const params = new URLSearchParams()
      params.append('where', `container = "co-cms-pages" and key != "${this.key}"`)
      params.append('limit', '500')
      // do we need that?// params.append('expand', 'value.dependencies[*]')
      client.get(`/custom-objects`, params)
        .then(res => {
          this.otherPagesQueryResult = res.data
          this.otherPagesQueryResult.results.forEach(page => (this.pagesIdToObjectMap[page.id] = page))
        })
        .catch(err => this.errors.push(err))
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.json-editor * {margin-bottom: 20px;}
</style>
