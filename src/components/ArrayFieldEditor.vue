<template>
  <div class="array-editor">
    <div v-for="(item, index) in value" :key="index" class="array-entry">
      <entry-editor :value="item" name="name to give"></entry-editor>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ArrayFieldEditor',
  props: ['value', 'name'],
  data () {
    return {
      updatedValue: this.value
    }
  }
}
</script>

<style scoped>
  .array-entry {border: 1px solid black; margin-bottom: 10px;}
</style>
