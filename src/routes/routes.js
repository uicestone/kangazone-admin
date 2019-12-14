import DashboardLayout from "@/pages/Dashboard/Layout/DashboardLayout.vue";
import AuthLayout from "@/pages/Dashboard/Pages/AuthLayout.vue";

// Dashboard pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";

// Pages
const User = () => require("@/pages/Dashboard/User/UserProfile.vue").default;
const UserList = () => require("@/pages/Dashboard/User/UserList.vue").default;
const Booking = () =>
  require("@/pages/Dashboard/Booking/BookingDetail.vue").default;
const BookingList = () =>
  require("@/pages/Dashboard/Booking/BookingList.vue").default;
// const Code = () => require("@/pages/Dashboard/Code/CodeDetail.vue").default;
const CodeList = () => require("@/pages/Dashboard/Code/CodeList.vue").default;
// const Payment = () => require("@/pages/Dashboard/Payment/PaymentDetail.vue").default;
const PaymentList = () =>
  require("@/pages/Dashboard/Payment/PaymentList.vue").default;
// const Store = () => require("@/pages/Dashboard/Store/StoreDetail.vue").default;
const StoreList = () =>
  require("@/pages/Dashboard/Store/StoreList.vue").default;
const ConfigList = () =>
  require("@/pages/Dashboard/Config/ConfigList.vue").default;
const Config = () => require("@/pages/Dashboard/Config/Config.vue").default;
const Pricing = () => require("@/pages/Dashboard/Pages/Pricing.vue").default;
const TimeLine = () =>
  require("@/pages/Dashboard/Pages/TimeLinePage.vue").default;
const RtlSupport = () =>
  require("@/pages/Dashboard/Pages/RtlSupport.vue").default;
const Login = () => require("@/pages/Dashboard/Pages/Login.vue").default;
const Register = () => require("@/pages/Dashboard/Pages/Register.vue").default;
const Lock = () => require("@/pages/Dashboard/Pages/Lock.vue").default;

// Components pages
const Buttons = () =>
  require("@/pages/Dashboard/Components/Buttons.vue").default;
const GridSystem = () =>
  require("@/pages/Dashboard/Components/GridSystem.vue").default;
const Panels = () => require("@/pages/Dashboard/Components/Panels.vue").default;
const SweetAlert = () =>
  require("@/pages/Dashboard/Components/SweetAlert.vue").default;
const Notifications = () =>
  require("@/pages/Dashboard/Components/Notifications.vue").default;
const Icons = () => require("@/pages/Dashboard/Components/Icons.vue").default;
const Typography = () =>
  require("@/pages/Dashboard/Components/Typography.vue").default;

// Forms pages
const RegularForms = () =>
  require("@/pages/Dashboard/Forms/RegularForms.vue").default;
const ExtendedForms = () =>
  require("@/pages/Dashboard/Forms/ExtendedForms.vue").default;
const ValidationForms = () =>
  require("@/pages/Dashboard/Forms/ValidationForms.vue").default;
const Wizard = () => require("@/pages/Dashboard/Forms/Wizard.vue").default;

// TableList pages
const RegularTables = () =>
  require("@/pages/Dashboard/Tables/RegularTables.vue").default;
const ExtendedTables = () =>
  require("@/pages/Dashboard/Tables/ExtendedTables.vue").default;
const PaginatedTables = () =>
  require("@/pages/Dashboard/Tables/PaginatedTables.vue").default;

// Maps pages
const GoogleMaps = () =>
  require("@/pages/Dashboard/Maps/GoogleMaps.vue").default;
const FullScreenMap = () =>
  require("@/pages/Dashboard/Maps/FullScreenMap.vue").default;
const VectorMaps = () =>
  require("@/pages/Dashboard/Maps/VectorMaps.vue").default;

// Calendar
const Calendar = () => require("@/pages/Dashboard/Calendar.vue").default;
// Charts
const Charts = () => require("@/pages/Dashboard/Charts.vue").default;
const Widgets = () => require("@/pages/Dashboard/Widgets.vue").default;

let componentsMenu = {
  path: "/components",
  component: DashboardLayout,
  redirect: "/components/buttons",
  name: "Components",
  children: [
    {
      path: "buttons",
      name: "Buttons",
      components: { default: Buttons }
    },
    {
      path: "grid-system",
      name: "Grid System",
      components: { default: GridSystem }
    },
    {
      path: "panels",
      name: "Panels",
      components: { default: Panels }
    },
    {
      path: "sweet-alert",
      name: "Sweet Alert",
      components: { default: SweetAlert }
    },
    {
      path: "notifications",
      name: "Notifications",
      components: { default: Notifications }
    },
    {
      path: "icons",
      name: "Icons",
      components: { default: Icons }
    },
    {
      path: "typography",
      name: "Typography",
      components: { default: Typography }
    }
  ]
};
let formsMenu = {
  path: "/forms",
  component: DashboardLayout,
  redirect: "/forms/regular",
  name: "Forms",
  children: [
    {
      path: "regular",
      name: "Regular Forms",
      components: { default: RegularForms }
    },
    {
      path: "extended",
      name: "Extended Forms",
      components: { default: ExtendedForms }
    },
    {
      path: "validation",
      name: "Validation Forms",
      components: { default: ValidationForms }
    },
    {
      path: "wizard",
      name: "Wizard",
      components: { default: Wizard }
    }
  ]
};

let tablesMenu = {
  path: "/table-list",
  component: DashboardLayout,
  redirect: "/table-list/regular",
  name: "Tables",
  children: [
    {
      path: "regular",
      name: "Regular Tables",
      components: { default: RegularTables }
    },
    {
      path: "extended",
      name: "Extended Tables",
      components: { default: ExtendedTables }
    },
    {
      path: "paginated",
      name: "Pagianted Tables",
      components: { default: PaginatedTables }
    }
  ]
};

let mapsMenu = {
  path: "/maps",
  component: DashboardLayout,
  name: "Maps",
  redirect: "/maps/google",
  children: [
    {
      path: "google",
      name: "Google Maps",
      components: { default: GoogleMaps }
    },
    {
      path: "full-screen",
      name: "Full Screen Map",
      meta: {
        hideContent: true,
        hideFooter: true,
        navbarAbsolute: true
      },
      components: { default: FullScreenMap }
    },
    {
      path: "vector-map",
      name: "Vector Map",
      components: { default: VectorMaps }
    }
  ]
};

let pagesMenu = {
  path: "/pages",
  component: DashboardLayout,
  name: "Pages",
  redirect: "/pages/user",
  children: [
    {
      path: "user",
      name: "User Page",
      components: { default: User }
    },
    {
      path: "timeline",
      name: "Timeline Page",
      components: { default: TimeLine }
    },
    {
      path: "rtl",
      name: "وحة القيادة",
      meta: {
        rtlActive: true
      },
      components: { default: RtlSupport }
    }
  ]
};

let bookingMenu = {
  path: "/booking",
  component: DashboardLayout,
  redirect: "/booking/index",
  children: [
    {
      path: "index",
      name: "预约列表",
      component: BookingList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: ":id",
      name: "预约详情",
      component: Booking
    }
  ]
};

let codeMenu = {
  path: "/code",
  component: DashboardLayout,
  redirect: "/code/index",
  children: [
    {
      path: "index",
      name: "券码列表",
      component: CodeList,
      meta: {
        keepAlive: true
      }
    }
    // {
    //   path: ":id",
    //   name: "券码详情",
    //   component: Code
    // }
  ]
};

let paymentMenu = {
  path: "/payment",
  component: DashboardLayout,
  redirect: "/payment/index",
  children: [
    {
      path: "index",
      name: "流水明细",
      component: PaymentList,
      meta: {
        keepAlive: true
      }
    }
    // {
    //   path: ":id",
    //   name: "流水详情",
    //   component: Payment
    // }
  ]
};

let storeMenu = {
  path: "/store",
  component: DashboardLayout,
  redirect: "/store/index",
  children: [
    {
      path: "index",
      name: "场馆明细",
      component: StoreList,
      meta: {
        keepAlive: true
      }
    }
    // {
    //   path: ":id",
    //   name: "场馆详情",
    //   component: Store
    // }
  ]
};

let configMenu = {
  path: "/config",
  component: DashboardLayout,
  redirect: "/config/index",
  children: [
    {
      path: "index",
      name: "配置列表",
      component: ConfigList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: ":key",
      name: "配置详情",
      component: Config
    }
  ]
};

let userMenu = {
  path: "/user",
  component: DashboardLayout,
  redirect: "/user/index",
  children: [
    {
      path: "index",
      name: "用户列表",
      component: UserList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: ":id",
      name: "用户详情",
      component: User
    }
  ]
};

let authPages = {
  path: "/",
  component: AuthLayout,
  name: "Authentication",
  children: [
    {
      path: "/login",
      name: "用户登录",
      component: Login
    },
    {
      path: "/register",
      name: "用户注册",
      component: Register
    },
    {
      path: "/pricing",
      name: "Pricing",
      component: Pricing
    },
    {
      path: "/lock",
      name: "锁定",
      component: Lock
    }
  ]
};

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "Home"
  },
  componentsMenu,
  formsMenu,
  tablesMenu,
  mapsMenu,
  pagesMenu,
  bookingMenu,
  codeMenu,
  paymentMenu,
  storeMenu,
  configMenu,
  userMenu,
  authPages,
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "dashboard",
        name: "数据统计",
        components: { default: Dashboard }
      },
      {
        path: "calendar",
        name: "Calendar",
        components: { default: Calendar }
      },
      {
        path: "charts",
        name: "Charts",
        components: { default: Charts }
      },
      {
        path: "widgets",
        name: "Widgets",
        components: { default: Widgets }
      }
    ]
  }
];

export default routes;
