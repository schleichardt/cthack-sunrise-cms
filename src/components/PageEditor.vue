<template>
  <div>
    {{fields}}

    <form>
      <div class="form-group">
        <label for="key">Key:</label>
        <input class="form-control" id="key" type="text" v-bind:value="key">
      </div>
      <div class="form-group">
        <button type="button">[]</button>
        <button type="button">{}</button>
      </div>
      <label>Fields:</label>
      <div class="input-group" v-for="fieldName in Object.keys(fields)" :key="fieldName">
        <label :for="fieldName">{{fieldName}}</label>
        <input class="form-control" :id="fieldName" type="text" v-model="fields[fieldName]">
        <button type="button" @click="deleteField(fieldName)">Delete</button>
      </div>
      <div class="input-group">
        <input class="form-control" :id="newFieldKey" type="text" v-model="newFieldKey">
        <input class="form-control" :id="newFieldValue" type="text" v-model="newFieldValue">
        <button type="button" @click="addField">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PageEditor',
  data () {
    return {
      key: 'home',
      fields: { msg: 'welcome to sunrise' },
      newFieldKey: 'new-field',
      newFieldValue: 'Lorem Ipsum'
    }
  },
  methods: {
    addField: function () {
      this.$set(this.fields, this.newFieldKey, this.newFieldValue)
    },
    deleteField: function (fieldName) {
      this.$delete(this.fields, fieldName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
