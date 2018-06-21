<template>
  <div class="entry-editor">
    <array-field-editor v-if="Array.isArray(value)" :value="value" :name="name"></array-field-editor>
    <object-field-editor v-else-if="typeof value === 'object'" :value="value" :name="name"></object-field-editor>
    <string-field-editor v-else-if="typeof value === 'string'" :value="value" :name="name"></string-field-editor>
    <div v-else>{{value}}:{{typeof value}} |</div>
  </div>
</template>

<script>
export default {
  name: 'EntryEditor',
  props: ['value', 'name'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>
