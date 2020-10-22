<template>
  <v-container>
    <v-row class="fill-height" justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title primary-title>
            欢迎访问
          </v-card-title>
          <v-card-text>
            <v-form v-model="isValided">
              <v-text-field
                v-model="form.username"
                :rules="rules.username"
                label="账号"
                autofocus
                clearable
                required
                @keyup.enter="handleSubmit"
              />
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
                label="密码"
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
              登录
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
          v => !!v || '账号不能为空',
          v => v.length >= 2 || '账号长度为2-16位',
          v => v.length <= 16 || '账号长度为2-16位',
        ],
        password: [
          v => !!v || '密码不能为空',
          v => v.length >= 6 || '密码长度为6-16位',
          v => v.length <= 16 || '密码长度为6-16位',
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
        await this.login(this.form)
        this.submitLoading = false
      }
    },
  },
}
</script>
