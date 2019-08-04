<template>
  <div>
    <md-progress-bar md-mode="indeterminate" v-if="isLoading"></md-progress-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import { Auth } from "@/resources/Auth";

moment.locale("zh-cn");

export default {
  mixins: [Auth],
  data() {
    return {
      isLoading: false
    };
  },
  async created() {
    Vue.http.options.root = process.env.VUE_APP_API_BASE;
    Vue.http.interceptors.push(interceptor(this));
    Vue.filter("date", (value, format) => {
      if (!value) {
        return null;
      }
      return moment(value).format(format || "YYYY-MM-DD HH:mm");
    });
    Vue.filter("duration", value => {
      return moment.duration(value).humanize();
    });
    Vue.filter("round", (value, digits) => {
      if (!value) {
        return (0).toFixed(digits);
      }
      return value.toFixed(digits || 0);
    });
    Vue.filter("bookingTypeName", value => {
      return this.$bookingTypeNames[value];
    });
    Vue.filter("bookingStatusName", value => {
      return this.$bookingStatusNames[value];
    });
    Vue.filter("currency", value => {
      if (value === undefined) return "-";
      return "¥ " + value.toFixed(2);
    });
    try {
      this.$user = await this.auth();
    } catch (e) {
      console.warn(e);
    }
  }
};

const interceptor = vm => {
  return request => {
    vm.isLoading = true;

    const token = window.localStorage.getItem("token");

    if (token) {
      request.headers.set("Authorization", token);
    }
    // stop request and return 401 response when no token exist except for login request
    if (request.url !== "auth/login" && !window.localStorage.getItem("token")) {
      window.location.hash = "#/login";
      vm.isLoading = false;
      return Promise.reject("No token exists, login required.");
    }
    return response => {
      vm.isLoading = false;
      if (response.status >= 500) {
        const message = "服务器内部错误";

        vm.$notify({
          message,
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: "danger"
        });

        return Promise.reject(message);
      } else if (response.status >= 400) {
        // redirect to login page on any 401 response
        if (response.status === 401) {
          window.location.hash = "#/login";
          window.localStorage.removeItem("token");
        }
        const message = response.body.message || response.statusText;

        vm.$notify({
          message,
          icon: "add_alert",
          horizontalAlign: "center",
          verticalAlign: "bottom",
          type: "warning"
        });

        return Promise.reject(message);
      }
      return response;
    };
  };
};
</script>

<style lang="scss">
@import "./assets/scss/md/variables";
.md-progress-bar {
  position: fixed;
  width: $sidebar-width;
  top: 0;
  right: 0;
  z-index: 2100;
}
@media (max-width: $screen-sm-min) {
  .md-progress-bar {
    left: 0;
    width: 100%;
  }
}
.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>
