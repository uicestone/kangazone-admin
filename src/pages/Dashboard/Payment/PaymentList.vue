<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-primary">
          <div class="card-icon">
            <md-icon>payment</md-icon>
          </div>
          <h4 class="title">流水明细</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="noop"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar>
              <md-field>
                <md-input
                  type="search"
                  clearable
                  placeholder="搜索"
                  style="width: 200px;"
                  v-model="searchQuery.keyword"
                >
                </md-input>
              </md-field>

              <div class="">
                <!-- <md-button class="md-primary" @click="showCreate">
                  支付流水               </md-button> -->
              </div>
            </md-table-toolbar>

            <md-table-row
              slot="md-table-row"
              md-selectable="single"
              slot-scope="{ item }"
              @click="showDetail(item)"
            >
              <md-table-cell md-label="客人" md-sort-by="customer.name">{{
                item.customer.name
              }}</md-table-cell>
              <md-table-cell md-label="金额" md-sort-by="amount"
                >¥{{ item.amount }}</md-table-cell
              >
              <md-table-cell md-label="完成" md-sort-by="paid">{{
                item.paid ? "是" : "否"
              }}</md-table-cell>
              <md-table-cell
                md-label="描述"
                md-sort-by="title"
                style="width:35%"
                >{{ item.title }}</md-table-cell
              >
              <md-table-cell md-label="通道" md-sort-by="gateway">{{
                item.gateway | paymentGatewayName
              }}</md-table-cell>
              <md-table-cell md-label="创建时间" md-sort-by="createdAt">{{
                item.createdAt | date
              }}</md-table-cell>
              <md-table-cell
                md-label="相关链接"
                @click.native.stop="goToRelatedItem(item)"
                >{{ relatedItem(item) }}</md-table-cell
              >
              <!-- <md-table-cell md-label="操作">
                <md-button
                  class="md-just-icon md-danger md-simple"
                  @click="">
                  <md-icon>close</md-icon>
                </md-button>
              </md-table-cell> -->
            </md-table-row>
          </md-table>
        </md-card-content>
        <md-card-actions md-alignment="space-between">
          <div class="">
            <p class="card-category">{{ from }} - {{ to }} / {{ total }}</p>
          </div>
          <pagination
            class="pagination-no-border pagination-primary"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </pagination>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import { Pagination } from "@/components";
import { Payment } from "@/resources";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      currentSort: "updatedAt",
      currentSortOrder: "desc",
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0
      },
      searchQuery: {},
      searchDelayTimeout: null,
      queriedData: []
    };
  },
  mounted() {
    this.queryData();
  },
  computed: {
    query() {
      return Object.assign({}, this.searchQuery, {
        limit: this.pagination.perPage,
        skip: (this.pagination.currentPage - 1) * this.pagination.perPage,
        order: this.currentSort
          ? `${this.currentSortOrder === "desc" ? "-" : ""}${this.currentSort}`
          : undefined
      });
    },
    from() {
      return Math.min(
        this.pagination.perPage * (this.pagination.currentPage - 1) + 1,
        this.total
      );
    },
    to() {
      return Math.min(this.from + this.pagination.perPage - 1, this.total);
    },
    total() {
      return this.pagination.total;
    }
  },
  filters: {
    paymentGatewayName(gateway) {
      const gatewayNames = {
        credit: "余额支付",
        scan: "扫码支付",
        card: "刷卡支付",
        cash: "现金支付",
        wechatpay: "微信支付",
        alipay: "支付宝",
        unionpay: "银联支付"
      };
      return gatewayNames[gateway];
    }
  },
  methods: {
    async queryData() {
      const response = await Payment.get(this.query);
      this.queriedData = response.body;
      this.pagination.total = Number(response.headers.map["items-total"][0]);
    },
    showDetail(item) {
      this.$router.push(`/payment/${item.id}`);
    },
    showCreate() {
      this.$router.push("/payment/add");
    },
    goToRelatedItem(item) {
      const attach = item.attach.split(" ");
      switch (attach[0]) {
        case "booking":
          return this.$router.push(`/booking/${attach[1]}`);
      }
    },
    relatedItem(item) {
      const attach = item.attach.split(" ");
      switch (attach[0]) {
        case "booking":
          console.log("预约");
          return "预约";
      }
    },
    noop() {}
  },
  watch: {
    "pagination.currentPage"() {
      this.queryData();
    },
    searchQuery: {
      handler() {
        clearTimeout(this.searchDelayTimeout);
        this.searchDelayTimeout = setTimeout(() => {
          this.queryData();
        }, 1000);
      },
      deep: true
    },
    currentSort() {
      this.queryData();
    },
    currentSortOrder() {
      this.queryData();
    }
  }
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
