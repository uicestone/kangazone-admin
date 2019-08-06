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
                <md-button class="md-primary" @click="showCreate">
                  添加预约
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
              <md-table-cell md-label="客户" md-sort-by="customer.name">{{
                item.customer.name
              }}</md-table-cell>
              <md-table-cell md-label="日期" md-sort-by="date">{{
                item.date
              }}</md-table-cell>
              <md-table-cell md-label="时间" md-sort-by="checkInAt">{{
                item.checkInAt
              }}</md-table-cell>
              <md-table-cell md-label="类型" md-sort-by="type">{{
                item.type | bookingTypeName
              }}</md-table-cell>
              <md-table-cell md-label="时长" md-sort-by="hours"
                >{{ item.hours }}小时</md-table-cell
              >
              <md-table-cell md-label="人数" md-sort-by="membersCount">{{
                item.membersCount
              }}</md-table-cell>
              <md-table-cell md-label="袜子" md-sort-by="socksCount">{{
                item.socksCount
              }}</md-table-cell>
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
