<template>
  <span>
    {{data | formatDateTime('Europe/Berlin')}}
  </span>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'dateTime',
  props: ['data'],
  filters: {
    formatDateTime (time, zone) {
      return moment(time).tz(zone).locale('DE').format('llll')
    }
  }
}
</script>

<style scoped>

</style>
