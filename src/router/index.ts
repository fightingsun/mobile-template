import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

// 路由元信息类型定义
declare module 'vue-router' {
  interface RouteMeta {
    // 路由标题
    title?: string;
  }
}

// 路由表
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/index.vue'),
  },
];

// 路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    return {
      top: 0,
    };
  },
});

export default router;
