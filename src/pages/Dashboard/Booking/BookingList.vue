<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-primary">
          <div class="card-icon">
            <md-icon>timer</md-icon>
          </div>
          <h4 class="title">预约列表</h4>
        </md-card-header>
        <md-card-content>
          <md-table
            :value="queriedData"
            :md-sort.sync="currentSort"
            :md-sort-order.sync="currentSortOrder"
            :md-sort-fn="noop"
            class="paginated-table table-striped table-hover"
          >
            <md-table-toolbar class="md-layout mb-2">
              <div class="md-layout">
                <md-datepicker
                  v-model="searchQuery.date"
                  :md-model-type="String"
                  md-immediately
                  class="md-layout-item md-size-20 md-xsmall-size-100"
                  ><label>日期</label>
                </md-datepicker>

                <md-field class="md-layout-item md-size-20 md-xsmall-size-100">
                  <label>筛选状态</label>
                  <md-select v-model="searchQuery.status" multiple>
                    <md-option
                      v-for="(name, status) in bookingStatusNames"
                      :key="status"
                      :value="status"
                      >{{ name }}</md-option
                    >
                  </md-select>
                </md-field>

                <md-field class="md-layout-item md-size-20 md-xsmall-size-100">
                  <label>筛选类型</label>
                  <md-select v-model="searchQuery.type">
                    <md-option value="">全部类型</md-option>
                    <md-option
                      v-for="(name, type) in {
                        play: '自由游玩',
                        party: '派对'
                      }"
                      :key="type"
                      :value="type"
                      >{{ name }}</md-option
                    >
                  </md-select>
                </md-field>

                <md-field class="md-layout-item md-size-20 md-xsmall-size-100">
                  <label>搜索客户</label>
                  <md-input
                    type="search"
                    clearable
                    v-model="searchQuery.customerKeyword"
                  >
                  </md-input>
                </md-field>
              </div>
              <div class="toolbar-actions">
                <md-button class="md-simple" @click="showCreate">
                  手动添加预约
                </md-button>
                <md-button class="md-just-icon md-simple" @click="queryData">
                  <md-icon>refresh</md-icon>
                </md-button>
              </div>
            </md-table-toolbar>

            <md-table-row
              slot="md-table-row"
              md-selectable="single"
              slot-scope="{ item }"
              @click="showDetail(item)"
            >
              <md-table-cell md-label="门店" md-sort-by="store.name">{{
                item.store.name
              }}</md-table-cell>
              <md-table-cell
                md-label="客户"
                md-sort-by="customer.name"
                @click.native.stop="goToCustomer(item.customer)"
                >{{ item.customer.name }}
                <span v-if="item.customer.mobile">{{
                  item.customer.mobile.substr(-4)
                }}</span>
              </md-table-cell>
              <md-table-cell md-label="日期" md-sort-by="date">{{
                item.date
              }}</md-table-cell>
              <md-table-cell md-label="时间" md-sort-by="checkInAt">{{
                item.checkInAt
              }}</md-table-cell>
              <!-- <md-table-cell md-label="类型" md-sort-by="type">{{
                item.type | bookingTypeName
              }}</md-table-cell> -->
              <md-table-cell md-label="时长" md-sort-by="hours"
                >{{ item.hours }}小时</md-table-cell
              >
              <md-table-cell md-label="人数/袜子" md-sort-by="membersCount"
                >{{ item.membersCount }} / {{ item.socksCount }}</md-table-cell
              >
              <md-table-cell md-label="价格/已付" md-sort-by="socksCount"
                >{{ item.price }} /
                {{ item.payments | paidAmount }}</md-table-cell
              >
              <md-table-cell md-label="状态" md-sort-by="status">{{
                item.status | bookingStatusName
              }}</md-table-cell>
              <md-table-cell md-label="创建时间" md-sort-by="createdAt">{{
                item.createdAt | date
              }}</md-table-cell>
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
import { Booking } from "@/resources";
import moment from "moment";

export default {
  components: {
    Pagination
  },
  data() {
    return {
      currentSort: "createdAt",
      currentSortOrder: "desc",
      pagination: {
        perPage: 10,
        currentPage: 1,
        total: 0
      },
      searchQuery: {
        date: moment().format("YYYY-MM-DD")
      },
      searchDelayTimeout: null,
      queriedData: [],
      bookingStatusNames: this.$bookingStatusNames
    };
  },
  activated() {
    this.queryData();
  },
  computed: {
    query() {
      const searchQuery = {
        ...this.searchQuery,
        limit: this.pagination.perPage,
        skip: (this.pagination.currentPage - 1) * this.pagination.perPage,
        order: this.currentSort
          ? `${this.currentSortOrder === "desc" ? "-" : ""}${this.currentSort}`
          : undefined
      };

      for (let field in searchQuery) {
        if (Array.isArray(searchQuery[field])) {
          searchQuery[field] = searchQuery[field].join(",");
        }
      }

      return searchQuery;
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
  methods: {
    async queryData() {
      const response = await Booking.get(this.query);
      this.queriedData = response.body;
      this.pagination.total = Number(response.headers.map["items-total"][0]);
    },
    showDetail(item) {
      this.$router.push(`/booking/${item.id}`);
    },
    showCreate() {
      this.$router.push("/booking/add");
    },
    goToCustomer(customer) {
      this.$router.push(`/user/${customer.id}`);
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
  },
  filters: {
    paidAmount(payments) {
      return payments
        .filter(p => p.paid)
        .map(p => p.amount)
        .reduce((sum, amount) => sum + amount, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
* >>> .md-datepicker .md-date-icon {
  margin-top: 12px;
  margin-bottom: 0;
}
</style>
