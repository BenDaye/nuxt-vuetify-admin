<template>
  <v-row class="flex-column align-stretch flex-norwap">
    <div class="mb-8">
      <div class="font-weight-bold d-flex align-center pb-2">
        <span class="mr-2">ID</span>
        <span class="text-decoration-dashed">{{ user.id }}</span>
      </div>
      <div class="font-weight-bold d-flex align-center">
        <span class="mr-2">角色</span>
        <span
          v-for="(r, i) in user.role"
          :key="i"
          :class="i ? 'ml-2' : ''"
          class="text-uppercase text-decoration-dashed"
        >
          {{ r }}
        </span>
      </div>
    </div>
    <v-card
      v-if="user.status === -1"
      color="warning mb-8"
    >
      <v-card-title primary-title>
        禁用用户
      </v-card-title>
      <v-card-subtitle>
        此用户已被管理员禁用,登录等功能将无法使用.
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          dark
          depressed
        >
          <v-icon
            left
            size="16px"
          >
            mdi-account-check
          </v-icon> 启用
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-8">
      <v-card-title primary-title>
        会员信息
      </v-card-title>
      <v-card-text>
        <div class="d-flex flex-column flex-sm-row">
          <div class="d-flex flex-column align-center">
            <v-avatar
              :size="96"
              class="mr-1 elevation-2"
              tile
            >
              <img
                v-if="user.avatar"
                :src="`${user.avatar}?height=192`"
                alt="Avatar"
              >
              <v-icon
                v-else
                :size="96"
                color="default"
              >
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <v-btn
              class="mt-2"
              small
            >
              更换头像
            </v-btn>
          </div>
          <div class="flex-grow-1 pt-4 pa-sm-4 pt-sm-0">
            <v-form v-model="valid">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="user.username"
                    label="账号"
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="form.nickname"
                    label="昵称"
                    dense
                    @blur="handleChangeNickname"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-select
                    v-model="form.gender"
                    :items="genders"
                    label="性别"
                    dense
                    @change="handleChangeGender"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="user.email"
                    label="邮箱"
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="user.phone"
                    label="手机"
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="user.wechat"
                    label="微信"
                    dense
                    disabled
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  lg="3"
                  xl="2"
                >
                  <v-text-field
                    v-model="user.invite_code"
                    label="邀请码"
                    dense
                    disabled
                  />
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
    <v-sheet
      :elevation="2"
      rounded
      class="mb-8"
    >
      <v-card flat>
        <v-card-title primary-title>
          重置密码
        </v-card-title>
        <v-card-subtitle>
          重置密码...
        </v-card-subtitle>
        <v-card-text>
          <v-btn
            color="error"
            class="mb-4"
          >
            重置密码
          </v-btn>
        </v-card-text>
      </v-card>
      <v-divider />
      <v-card flat>
        <v-card-title primary-title>
          设置角色
        </v-card-title>
        <v-card-subtitle>
          设置角色...
        </v-card-subtitle>
        <v-card-text>
          <v-autocomplete
            v-model="form.roles"
            :items="roles"
            item-text="description"
            item-value="name"
            cache-items
            placeholder="角色"
            multiple
            chips
            class="mb-4"
            @change="handleChangeRole"
          />
        </v-card-text>
      </v-card>
      <v-divider />
      <v-card flat>
        <v-card-title primary-title>
          修改状态
        </v-card-title>
        <v-card-subtitle>
          修改状态...
        </v-card-subtitle>
        <v-card-text>
          <v-radio-group
            v-model="form.status"
            class="mb-4"
          >
            <v-radio
              label="启用"
              :value="1"
            />
            <v-radio
              label="禁用"
              :value="-100"
            />
            <v-radio
              label="未激活"
              :value="-1"
            />
          </v-radio-group>
          <v-btn
            color="primary"
            class="mb-4"
          >
            保存
          </v-btn>
        </v-card-text>
      </v-card>
    </v-sheet>
    <v-card
      v-if="!$vuetify.breakpoint.mobile"
      class="mb-8"
    >
      <v-card-title primary-title>
        Raw Data
      </v-card-title>
      <v-card-text>
        <code class="body-2">
          <pre>{{ user }}</pre>
        </code>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { getUrl, User, Role } from '~/api'
export default {
  layout: 'child',
  middleware: ['id'],
  async asyncData({ $axios, params }) {
    const { data: userData } = await $axios.$get(`${getUrl(User.user)}/${params.id}`)
    const { data: roles } = await $axios.$get(getUrl(Role.role))
    const { role, nickname, gender, avatar, status } = userData
    return {
      user: userData,
      roles,
      form: {
        roles: role,
        nickname,
        gender,
        avatar,
        status,
      },
    }
  },
  data() {
    return {
      valid: false,
      genders: [
        {
          text: '无',
          value: 0,
        },
        {
          text: '男',
          value: 1,
        },
        {
          text: '女',
          value: 2,
        },
      ],
    }
  },
  head() {
    return {
      info: {
        title: '会员详情',
        desc: '查看或编辑会员信息',
      },
    }
  },
  computed: {
    ...mapGetters({
      role: 'role/role',
    }),
    id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.getRole()
  },
  methods: {
    ...mapActions({
      getUserDetail: 'user/getUserDetail',
      updateUser: 'user/updateUser',
      updateUserRole: 'user/updateUserRole',
      getRole: 'role/getRole',
    }),
    async handleChangeNickname() {
      const id = this.id
      const nickname = this.form.nickname
      if (!nickname || nickname === this.user.nickname) {
        this.form.nickname = this.user.nickname
        return
      }
      const { data } = await this.updateUser({ id, nickname })
      this.user = data
    },
    async handleChangeGender(gender) {
      const id = this.id
      if (gender === undefined || !this.id) {
        return
      }
      const { data } = await this.updateUser({ id, gender })
      this.user = data
    },
    async handleChangeRole(role) {
      const id = this.id
      if (role === undefined || !role.length) {
        this.form.roles = this.user.role
        return
      }
      const { data } = await this.updateUserRole({ id, role })
      this.user = data
    },
  },
}
</script>
