<template>
  <div class="array-editor">
    array: {{value}}
  </div>
</template>

<script>
import EntryEditor from './EntryEditor'
export default {
  props: ['value', 'name'],
  components: {EntryEditor},
  data () {
    return {
      updatedValue: this.value
    }
  }
}
</script>

<style scoped>
</style>
