<template>
  <div class="md-layout text-center">
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <form @submit.prevent="submitLogin">
        <login-card header-color="primary">
          <h4 slot="title" class="title">登录</h4>
          <!-- <md-button
            slot="buttons"
            href="#facebook"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-facebook-square"></i>
          </md-button>
          <md-button
            slot="buttons"
            href="#twitter"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-twitter"></i>
          </md-button>
          <md-button
            slot="buttons"
            href="#google"
            class="md-just-icon md-simple md-white"
          >
            <i class="fab fa-google-plus-g"></i>
          </md-button> -->
          <!-- <p slot="description" class="description">Or Be Classical</p> -->
          <md-field class="md-form-group" slot="inputs">
            <md-icon>face</md-icon>
            <label>用户名</label>
            <md-input v-model="username"></md-input>
          </md-field>
          <md-field class="md-form-group" slot="inputs">
            <md-icon>lock_outline</md-icon>
            <label>密码</label>
            <md-input type="password" v-model="password"></md-input>
          </md-field>
          <md-button
            type="submit"
            slot="footer"
            class="md-simple md-success md-lg"
          >
            登录
          </md-button>
        </login-card>
      </form>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import { Auth } from "@/resources/Auth";
export default {
  mixins: [Auth],
  components: {
    LoginCard
  },
  data() {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async submitLogin() {
      const { user, token } = await this.login(this.username, this.password);
      window.localStorage.setItem("token", token);
      this.$user = user;
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
