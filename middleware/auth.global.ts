
import { useAuthStore } from '../store/auth';
export default defineNuxtRouteMiddleware((to) => {
    
    const authStore = useAuthStore();
    const token = useCookie('token');
    
    if (token.value) { // check if value exists
      authStore.authenticated = true; // update the state to authenticated
      authStore.token = token.value; // update the state to authenticated
    }

    
    // // if token exists and url is /login redirect to Homepage
    if (token.value && to?.name === 'login') {
      return navigateTo('/');
    }
  
    // // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login') {
      abortNavigation();
      return navigateTo('/login');
    }
});