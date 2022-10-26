/**
 * User Store
 * Use to manage user state
 */

import { getLogin } from '@/api/user';
import { HttpStateEnum } from '@/constant/http';
import { showWarningNotice } from '@/utils/message';
import dayjs from 'dayjs';

/** user state type */
interface UserStateData {
  token: string;
  nickname: string;
  username: string;
}

// localStorage key
const USER_KEY = 'USERINFO';

// save user information to the localStorage
function saveUserInfo(userInfo: UserStateData) {
  const maxSaveDays = import.meta.env.VITE_TOKEN_EXPIRE;
  const expire = dayjs().add(maxSaveDays, 'day').valueOf();
  window.localStorage.setItem(USER_KEY, JSON.stringify({ userInfo, expire }));
}

// load user information from the localStorage
function loadUserInfo() {
  const value = window.localStorage.getItem(USER_KEY);
  if (!value) return null;
  const { userInfo, expire } = JSON.parse(value) as {
    userInfo: UserStateData;
    expire: number;
  };
  // if expire invalid
  if (!dayjs(expire).isValid()) return null;
  // if out of date
  if (dayjs().isAfter(dayjs(expire))) {
    showWarningNotice('用户已过期，请重新登录！');
    // clear user info
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
  // if userInfo has no properties
  if (Object.keys(userInfo).length === 0) return null;
  // if any userInfo property value equals an empty string or null
  if (Object.entries(userInfo).some((obj) => !obj[1])) return null;
  return userInfo;
}

// user store management
const useUserStore = defineStore('user', {
  state(): UserStateData {
    let token = '';
    let nickname = '';
    let username = '';
    const userInfo = loadUserInfo();
    if (userInfo) {
      token = userInfo.token;
      nickname = userInfo.nickname;
      username = userInfo.username;
    }
    return {
      token,
      nickname,
      username,
    };
  },
  getters: {
    // 是否登录
    isLogin: (state) => !!(state.token && state.nickname && state.username),
  },
  actions: {
    async login(params: User.LoginParams) {
      const res = await getLogin(params);
      if (res.data.State !== HttpStateEnum.SUCCESS) return false;
      const { Token, UserNameCn, UserName } = res.data;
      this.$patch({ token: Token, nickname: UserNameCn, username: UserName });
      saveUserInfo(this.$state);
      return true;
    },
    logout() {
      this.$reset();
      window.localStorage.removeItem(USER_KEY);
      // 返回首页
      window.location.replace(import.meta.env.BASE_URL);
    },
  },
});

export default useUserStore;
