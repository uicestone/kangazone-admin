<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66 mx-auto">
        <edit-profile-form
          header-color="primary"
          :user="user"
          :save="save"
        ></edit-profile-form>
        <md-card class="payments-card">
          <md-card-header class="md-card-header-icon md-card-header-primary">
            <div class="card-icon">
              <md-icon>payment</md-icon>
            </div>
            <h4 class="title">充值记录</h4>
          </md-card-header>

          <md-card-content class="md-layout">
            <md-table>
              <md-table-row
                v-for="payment in depositPayments"
                :key="payment.id"
              >
                <md-table-cell md-label="金额" md-sort-by="amount"
                  >¥{{ payment.amount }}</md-table-cell
                >
                <md-table-cell md-label="完成" md-sort-by="paid">{{
                  payment.paid ? "是" : "否"
                }}</md-table-cell>
                <md-table-cell
                  md-label="描述"
                  md-sort-by="title"
                  style="width:35%"
                  >{{ payment.title }}</md-table-cell
                >
                <md-table-cell md-label="通道" md-sort-by="gateway">{{
                  payment.gateway | paymentGatewayName
                }}</md-table-cell>
                <md-table-cell md-label="创建时间" md-sort-by="createdAt">{{
                  payment.createdAt | date
                }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card button-color="primary"></user-card>
      </div> -->
    </div>
  </div>
</template>

<script>
import { EditProfileForm } from "@/pages";
import { User, Payment } from "@/resources";

export default {
  components: {
    EditProfileForm
  },
  data() {
    return {
      user: {
        name: "",
        roles: []
      },
      depositPayments: []
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id === "add") {
        this.user = (await User.save(this.user)).body;
      } else {
        this.user = (await User.update(
          { id: this.$route.params.id },
          this.user
        )).body;
      }
      this.$notify({
        message: "保存成功",
        icon: "check",
        horizontalAlign: "center",
        verticalAlign: "bottom",
        type: "success"
      });
      if (this.$route.params.id === "add") {
        this.$router.replace(`/user/${this.user.id}`);
      }
    }
  },
  async mounted() {
    if (this.$route.params.id !== "add") {
      if (this.$route.params.id === this.$user.id) {
        this.user = this.$user;
      } else {
        this.user = (await User.get({ id: this.$route.params.id })).body;
      }
      this.depositPayments = (await Payment.get({
        customer: this.user.id,
        attach: "deposit "
      })).body;
    }
  }
};
</script>
<style lang="scss">
.payments-card {
  margin-top: 50px;
  .md-table {
    width: 100%;
  }
}
</style>
