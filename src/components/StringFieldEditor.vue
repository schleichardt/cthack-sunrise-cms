<template>
  <div>
    <form class="form-inline">
      <div class="form-group">
        <label :for="formInputId">{{name}}</label>
        <input v-model="newValue" type="text" class="form-control" :id="formInputId">
      </div>
    </form>

  </div>
</template>

<script>
export default {
  props: ['value', 'name'],
  data () {
    return {
      formInputId: `field-${Math.random()}-input`,
      newValue: this.value
    }
  }
}
</script>

<style scoped>

</style>
