import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    token: null,
    loading: false,
    error: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      this.error = false;
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending;
   
      if (data.value.status == 0) {
        this.authenticated = false;
        this.error = data.value?.msg;
      } else if (data.value.status == 1) {
        const token = useCookie('token');
        token.value = data?.value?.token; // set token to cookie
        this.token = data?.value?.token;
        this.authenticated = true; // set authenticated  state value to true
      } 
    },
    logUserOut() {
      const token = useCookie('token');
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      this.token = null; // clear the token cookie
    },
  },
});