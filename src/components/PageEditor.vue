<template>
  <div class="container">
    <global-errors :errors="errors"/>
    <v-json-editor v-if="Object.keys(customObjectValue.content).length > 0"
      :data="customObjectValue.content"
      :editable="true"
      @change="$forceUpdate()"></v-json-editor>
    <button type="button" class="btn btn-primary" @click="save">Save</button>
  </div>
</template>

<script>
import client from '../ctp'
export default {
  name: 'PageEditor',
  data () {
    return {
      key: this.$route.params.pageKey,
      customObjectValue: {
        content: {},
        dependencies: []
      },
      errors: []
    }
  },
  methods: {
    save: function () {
      const customObjectDraft = {
        container: 'co-cms-pages',
        key: this.key,
        value: this.customObjectValue
      }
      client.post('/custom-objects', customObjectDraft)
        .then(res => this.$set(this, 'customObjectValue', res.data.value))
        .catch(err => this.errors.push(err))
    },
    addField: function () {
      const newFieldValue = this.newFieldType === 'object' ? {}
        : this.newFieldType === 'array' ? [] : ''
      this.$set(this.fields, this.newFieldKey, newFieldValue)
    },
    deleteField: function (fieldName) {
      this.$delete(this.fields, fieldName)
    },
    type: function (fieldName) {
      return typeof this.fields[fieldName]
    },
    loadData () {
      const params = new URLSearchParams()
      params.append('expand', 'value.dependencies[*]')
      client.get(`/custom-objects/co-cms-pages/${this.key}`, params)
        .then(res => this.$set(this, 'customObjectValue', res.data.value))
        .catch(err => this.errors.push(err))
    },
    keysOf (o) {
      return Object.keys(o)
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root-content-editor * {margin-bottom: 20px;}
</style>
