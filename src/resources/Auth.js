export const Auth = {
  created() {

  },
  methods: {
    async auth() {
      return (await this.$http.get('auth/user')).body;
    },
    async login(username, password) {
      return (await this.$http.post('auth/login', { username, password })).body;
    }
  }
};
