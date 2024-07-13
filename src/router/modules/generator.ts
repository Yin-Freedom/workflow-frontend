export default {
  path: "/generator",
  name: "generator",
  redirect: "/generator/parseSql",
  meta: {
    icon: "ri:information-line",
    // showLink: false,
    title: "异常页面",
    rank: 2
  },
  children: [
    {
      path: "/generator/parseSql",
      name: "parseSql",
      component: () => import("@/views/generator/parseSql.vue"),
      meta: {
        title: "SQL解析"
      }
    },
    {
      path: "/generator/customTemplate",
      name: "customTemplate",
      component: () => import("@/views/generator/customTemplate.vue"),
      meta: {
        title: "自定义模板"
      }
    }
  ]
} satisfies RouteConfigsTable;
