<template>
  <v-container>
    <v-row
      class="fill-height"
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card>
          <v-card-title primary-title>
            Welcome
          </v-card-title>
          <v-card-text>
            <v-form v-model="isValided">
              <v-text-field
                v-model="form.username"
                :rules="rules.username"
                label="Account"
                autofocus
                clearable
                required
                @keyup.enter="handleSubmit"
              />
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
                label="Password"
                type="password"
                clearable
                required
                @keyup.enter="handleSubmit"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              :disabled="!isValided"
              :loading="submitLoading"
              @click.stop="handleSubmit"
            >
              Sign In
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  layout: 'empty',
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [
          v => !!v || 'Required',
          v => v.length >= 2 || 'Must be between 2 and 16',
          v => v.length <= 16 || 'Must be between 2 and 16',
        ],
        password: [
          v => !!v || 'Required',
          v => v.length >= 6 || 'Must be between 6 and 16',
          v => v.length <= 16 || 'Must be between 6 and 16',
        ],
      },
      isValided: false,
      submitLoading: false,
    }
  },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
    }),
  },
  created() {
    if (this.authenticated) {
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapActions({
      login: 'auth/handleLogin',
    }),
    async handleSubmit() {
      if (this.isValided) {
        this.submitLoading = true
        const { status } = await this.login(this.form)
        this.submitLoading = false
        if (status === 1) {
          await this.$dialog.message.success('Successfully sign in', { position: 'top-right', timeout: 1500 })
          this.$router.push('/')
        }
      }
    },
  },
}
</script>
