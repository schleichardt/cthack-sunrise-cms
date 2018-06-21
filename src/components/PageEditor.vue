<template>
  <div>
    <global-errors :errors="errors"/>
    <hr>
    <hr>
    <div v-if="customObjectValue">
      <div class="">
        <legend class="col-form-label col-sm-2 pt-0">content</legend>
        <div class="root-content-editor" v-for="name in Object.keys(customObjectValue.content)" :name="name">
          <div class="full-entry-editor">
            <div class="container">
              <div class="row">
                <div class="col-1">
                  {{name}}
                </div>
                <div class="col">
                  <entry-editor :value="customObjectValue.content[name]" :name="name"></entry-editor>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hr>
    <b-form>
      <b-form-group label="Key">
        <b-form-input id="key" type="text" :value="key">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Fields">
        <b-input-group v-for="fieldName in Object.keys(fields)" :key="fieldName">
          <div v-if="type(fieldName) === 'string'">
            <label :for="fieldName">{{fieldName}}</label>
            <b-form-input :id="fieldName" type="text" v-model="fields[fieldName]">
            </b-form-input>
            <b-button type="button" @click="deleteField(fieldName)">Delete</b-button>
          </div>
        </b-input-group>
          <b-form-input class="form-control" type="text" v-model="newFieldKey"/>
          <b-form-radio-group id="newFieldType"
                              buttons
                              v-model="newFieldType"
                              :options="newFieldTypes"
                              name="newFieldType" />
        <b-button type="button" @click="addField">Add</b-button>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import client from '../ctp'
import ObjectFieldEditor from './ObjectFieldEditor'
import StringFieldEditor from './StringFieldEditor'
import ArrayFieldEditor from './ArrayFieldEditor'
import EntryEditor from './EntryEditor'

export default {
  name: 'PageEditor',
  components: {EntryEditor, ObjectFieldEditor, StringFieldEditor, ArrayFieldEditor},
  data () {
    return {
      key: this.$route.params.pageKey,
      customObjectValue: {
        content: {},
        dependencies: []
      },
      errors: [],
      fields: {
        banner: [
          {
            title: 'Sommer Essentials',
            subtitle: 'Die wichtigsten Stücke des Sommer Trends 2016',
            linkLabel: 'Jetzt bestellen',
            link: '/de/men',
            backgroundImage: '/assets/img/cms/leather1-4to3.jpg'
          }
        ],
        msg: 'welcome to sunrise'
      },
      newFieldKey: 'new-field',
      newFieldType: 'string',
      newFieldTypes: [
        { text: '""', value: 'string' },
        { text: '{}', value: 'array' },
        { text: '[]', value: 'object' }
      ]
    }
  },
  methods: {
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
        .then(res => (this.customObjectValue = res.data.value))
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
