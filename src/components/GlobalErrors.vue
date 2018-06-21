<template>
  <div>
    <div v-for="error in errors" :key="error.id" class="alert alert-danger m-3" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <div v-if="error.response">
        A backend request failed for {{error.config.method}} {{error.config.url}}:
        The server responded with status {{error.response.status}} and body
        <pre><code>{{error.response.data}}</code></pre>
      </div>
      <div v-else>
        {{error}}
      </div>

    </div>

    <div v-for="success in successes" :key="success.id" class="alert alert-success" role="alert">
      {{success}}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'global-errors',
  props: ['errors', 'successes'],
  data: function () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
