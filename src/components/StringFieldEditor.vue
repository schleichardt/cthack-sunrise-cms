<template>
  <div>
    <form>
      <div class="form-group row">
        <label :for="formInputId" class="col-sm-2 col-form-label">{{name}}</label>
        <div class="col-sm-10">
          <input v-model="newValue" type="text" class="form-control" :id="formInputId">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'StringFieldEditor',
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
