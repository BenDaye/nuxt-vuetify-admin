<template>
  <v-row class="flex-column align-stretch flex-norwap">
    <div class="mb-8">
      <div class="font-weight-bold d-flex align-center pb-2">
        <span class="mr-2">ID</span>
        <span class="text-decoration-dashed">{{ user.id }}</span>
      </div>
      <div class="font-weight-bold d-flex align-center">
        <span class="mr-2">Role</span>
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
        User Disabled
      </v-card-title>
      <v-card-subtitle>
        This user has been disabled! Login accesss has been revoked.
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
          </v-icon> Enable User
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mb-8">
      <v-card-title primary-title>
        Basic Information
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
              Edit Avatar
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
                    label="Account"
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
                    label="Nickname"
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
                    label="Gender"
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
                    label="Email"
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
                    label="Phone"
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
                    label="WeChat"
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
                    label="Invite Code"
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
          Reset User Password
        </v-card-title>
        <v-card-subtitle>
          Reset User Password...
        </v-card-subtitle>
        <v-card-text>
          <v-btn
            color="error"
            class="mb-4"
          >
            Reset User Password
          </v-btn>
        </v-card-text>
      </v-card>
      <v-divider />
      <v-card flat>
        <v-card-title primary-title>
          Edit User Role
        </v-card-title>
        <v-card-subtitle>
          Edit User Role...
        </v-card-subtitle>
        <v-card-text>
          <v-autocomplete
            v-model="form.roles"
            :items="roles"
            item-text="description"
            item-value="name"
            cache-items
            placeholder="Role"
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
          Edit Status
        </v-card-title>
        <v-card-subtitle>
          Edit Status...
        </v-card-subtitle>
        <v-card-text>
          <v-radio-group
            v-model="form.status"
            class="mb-4"
          >
            <v-radio
              label="Activated"
              :value="1"
            />
            <v-radio
              label="Forbidden"
              :value="-100"
            />
            <v-radio
              label="Deactivated"
              :value="-1"
            />
          </v-radio-group>
          <v-btn
            color="primary"
            class="mb-4"
          >
            Save
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
        <code class="caption">
          <pre>{{ user }}</pre>
        </code>
      </v-card-text>
      <v-card-text>
        <code class="caption">
          <pre>{{ roles }}</pre>
        </code>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'child',
  validate({ params: { id } }) { return !!id },
  async asyncData({ params: { id }, error, store: { dispatch } }) {
    try {
      const { data: user } = await dispatch('user/getUserDetail', { id })
      const { data: roles } = await dispatch('role/getRole')
      const { role, nickname, gender, avatar, status } = user
      return {
        id,
        user,
        roles,
        form: {
          roles: role,
          nickname,
          gender,
          avatar,
          status,
        },
      }
    } catch (err) {
      error(err)
    }
  },
  data() {
    return {
      valid: false,
      genders: [
        {
          text: 'None',
          value: 0,
        },
        {
          text: 'Male',
          value: 1,
        },
        {
          text: 'Female',
          value: 2,
        },
      ],
    }
  },
  head() {
    return {
      info: {
        title: 'Edit User',
        desc: 'Edit User',
      },
    }
  },
  methods: {
    ...mapActions({
      getUserDetail: 'user/getUserDetail',
      updateUser: 'user/updateUser',
      updateUserRole: 'user/updateUserRole',
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
