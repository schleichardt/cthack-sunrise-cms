<template>
  <div class="array-editor">
    <div v-for="(item, index) in value" :key="index" class="array-entry">
      <div class="row">
        <div class="col-1">
          {{`${name}[${index}]`}}
        </div>
        <div class="col">
          <entry-editor :value="item" :name="`${name}[${index}]`"></entry-editor>
        </div>
      </div>
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
  .array-entry {border: 1px solid black; margin-bottom: 10px; padding: 15px;}
</style>
