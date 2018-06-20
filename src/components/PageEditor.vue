<template>
  <div>
    {{fields}}

    <form>
      <div class="form-group">
        <label for="key">Key:</label>
        <input class="form-control" id="key" type="text" v-bind:value="key">
      </div>
      <div class="form-group">
        <button type="button" @click="addString">""</button>
        <button type="button">[]</button>
        <button type="button">{}</button>
      </div>
      <div class="form-group" v-for="fieldName in Object.keys(fields)" v-bind:key="fieldName">
        <label :for="fieldName">{{fieldName}}</label>
        <input class="form-control" :id="fieldName" type="text" v-bind:value="fields[fieldName]">
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
      fields: { msg: 'welcome to sunrise' }
    }
  },
  methods: {
    addString: function (event) {
      this.$set(this.fields, 'new-field', 'new-value')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
