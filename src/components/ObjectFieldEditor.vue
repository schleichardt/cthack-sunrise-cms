<template>
  <div>
    <div class="root-content-editor" v-for="entry in Object.entries(value)" :key="entry[0]">
      <div class="full-entry-editor">
        <div class="container">
          <entry-editor :value="entry[1]" :name="entry[0]"></entry-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectFieldEditor',
  props: ['value', 'name'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
