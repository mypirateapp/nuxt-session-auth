<template lang="pug">
  .fill-height(fluid='')
    n-link.button--green(to="/") Home
    div(top='', right='', vertical='', :color='snackbar.color', :timeout='snackbar.timeout')
      | {{ snackbar.text }}
      button(text='', @click='snackbar.show = false')
        | Close
    div(justify='center', align='center')
      div(cols='12', sm='8', md='4')
        .login-card.elevation-12(shaped='')
          form(@submit.prevent.stop='login')
            .d-flex.justify-center.align-center(flat='', dark='', color='primary')
              logo
            div
              div(type='error', :value='error', dismissible='', transition='scale-transition')
                | {{ error }}
              br
              input(v-model='username', label='Username', name='username', type='text', outlined='', placeholder=' ')
              input(v-model='password', label='Password', name='password', :append-icon='showPassword ? `mdi-eye` : `mdi-eye-off`', :type='showPassword ? `text` : `password`', outlined='', placeholder=' ', @click:append='showPassword = !showPassword')
              .d-flex.justify-end
                button(color='primafry', type='submit', :loading='loading', :disabled='$auth.loggedIn')
                  span(v-if="$auth.loggedIn") You are already logged in
                  span(v-else) Login
                button(color='primary' type='submit' :loading='loading' :disabled='$auth.loggedIn' @click="$auth.loginWith('facebook')")
                  span(v-if="$auth.loggedIn") You are already logged in
                  span(v-else) Login Facebook

</template>

<style>
.v-card {
  border-radius: 0.625rem;
}

.v-card header {
  border-radius: 0.625rem 0;
}
</style>

<script>
import Logo from '../components/Logo'

export default {
  components: { Logo },

  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      error: null,
      loading: false,
      snackbar: {
        show: false,
        color: '',
        text: '',
        timeout: 0,
      },
    }
  },

  methods: {
    async login() {
      this.error = null
      this.loading = true
      this.snackbar.show = false

      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })

        this.snackbar.color = 'success'
        this.snackbar.text = 'Successfully logged in. Redirecting..'
        this.snackbar.timeout = 2000
        this.snackbar.show = true

        setTimeout(async () => {
          this.snackbar.show = false
          await this.$router.push('/')
        }, 2000)
      } catch (err) {
        if (
          typeof err.response === 'undefined' ||
          typeof err.response.data === 'undefined' ||
          typeof err.response.data.message === 'undefined'
        ) {
          this.snackbar.color = 'error'
          this.snackbar.text = err.message
          this.snackbar.timeout = 5000
          this.snackbar.show = true
          return
        }

        this.error = err.response.data.message
      }

      this.loading = false
    },
  },
}
</script>
