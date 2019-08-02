import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import DashboardPlugin from "./material-dashboard";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
import routes from "./routes/routes";

// plugin setup
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(DashboardPlugin);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active"
});

// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

Object.defineProperty(Vue.prototype, "$user", {
  get() {
    this.$root.user.can = function(cap) {
      const roleCaps = {
        admin: ".*",
        manager: "view-(booking|user|code)"
      };
      return (
        this.roles &&
        this.roles.some(r => {
          return cap.match(`^${roleCaps[r]}$`);
        })
      );
    };

    return this.$root.user;
  },
  set(val) {
    this.$root.user = val;
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist,
    user: {}
  }
});
