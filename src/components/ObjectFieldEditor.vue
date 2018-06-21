<template>
  <div>
    <div class="root-content-editor" v-for="entry in Object.entries(value)">
      <div class="full-entry-editor">
        <div class="container">
          <entry-editor :value="entry[1]" :name="entry[0]"></entry-editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntryEditor from './EntryEditor'

export default {
  props: ['value', 'name'],
  components: {EntryEditor},
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
