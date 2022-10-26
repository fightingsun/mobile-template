import http from '@/utils/http';

// 用户登录
export function getLogin(params: unknown) {
  const url = '';
  return http.get(url, { params });
}
