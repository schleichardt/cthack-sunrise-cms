<template>
  <div class="container">
    <global-errors :errors="errors"/>
    <form>
      <div class="form-group row">
        <div class="col"><label for="projectKey">CTP Project Key</label></div>
        <div class="col"><input type="text" class="form-control" id="projectKey" v-model="projectKey" placeholder="Enter CTP project key"></div>
      </div>
      <div class="form-group row">
        <div class="col"><label for="clientId">CTP Client ID</label></div>
        <div class="col"><input type="text" class="form-control" id="clientId" v-model="clientId" placeholder="Enter CTP client id"></div>
      </div>
      <div class="form-group row">
        <div class="col"><label for="clientSecret">CTP Client Secret</label></div>
        <div class="col"><input type="password" class="form-control" id="clientSecret" v-model="clientSecret" placeholder="Enter CTP client secret"></div>
      </div>
      <div class="row">
        <div class="col"></div>
        <div class="col"><button type="submit" class="btn btn-primary" @click="login">Login</button></div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      errors: [],
      projectKey: '',
      clientSecret: '',
      clientId: ''
    }
  },
  methods: {
    login: function () {
      const authConfig = {
        auth: {
          username: this.clientId,
          password: this.clientSecret
        }
      }

      const authParams = new URLSearchParams()
      authParams.append('grant_type', 'client_credentials')
      authParams.append('scope', `manage_project:${this.projectKey}`)

      axios.post('/auth/oauth/token', authParams, authConfig)
        .then(tokens => {
          document.cookie = `token=${tokens.data.access_token}`
          document.cookie = `projectKey=${this.projectKey}`
          this.$router.push('/')
        }).catch(err => this.errors.push(err))
    }
  }
}
</script>

<style scoped>
</style>
