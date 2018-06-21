<template>
  <div>
    {{ fields }}
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
export default {
  name: 'PageEditor',
  data () {
    return {
      key: 'home',
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
