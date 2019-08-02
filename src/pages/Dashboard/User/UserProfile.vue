<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66 mx-auto">
        <edit-profile-form header-color="primary" :user="user" :save="save"></edit-profile-form>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card button-color="primary"></user-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import {EditProfileForm, UserCard} from '@/pages';
import {User} from '@/resources';

export default {
  components: {
    EditProfileForm,
    UserCard
  },
  data() {
    return {
      user: {
        name: '',
        roles: []
      }
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id === 'add') {
        this.user = (await User.save(this.user)).body;
      } else {
        this.user = (await User.update({id: this.$route.params.id}, this.user)).body;
      }
      this.$notify({
        message: '保存成功',
        icon: 'check',
        horizontalAlign: 'center',
        verticalAlign: 'bottom',
        type: 'success'
      });
      if (this.$route.params.id === 'add') {
        this.$router.replace(`/user/${this.user.id}`);
      }
    }
  },
  async mounted() {
    if (this.$route.params.id !== 'add') {
      if (this.$route.params.id === this.$user.id) {
        this.user = this.$user;
      } else {
        this.user = (await User.get({id: this.$route.params.id})).body;
      }
    }
  }
};
</script>
<style lang="scss">
</style>
