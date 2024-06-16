export default {
  path: "/workflow",
  redirect: "/workflow/definition",
  meta: {
    icon: "ri:information-line",
    // showLink: false,
    title: "工作流",
    rank: 1
  },
  children: [
    {
      path: "/workflow/definition",
      name: "definition",
      component: () => import("@/views/workflow/List.vue"),
      meta: {
        title: "定义"
      }
    },
    {
      path: "/workflow/flowInstance",
      name: "flowInstance",
      component: () => import("@/views/workflow/Task.vue"),
      meta: {
        title: "流程实例"
      }
    },
    {
      path: "/workflow/nodeInstance",
      name: "nodeInstance",
      component: () => import("@/views/workflow/Node.vue"),
      meta: {
        title: "节点实例"
      }
    },
    {
      path: "/workflow/flow",
      name: "flow",
      component: () => import("@/views/workflow/FlowChart.vue"),
      meta: {
        title: "流程图",
        showLink: false
      }
    },
  ]
} satisfies RouteConfigsTable;