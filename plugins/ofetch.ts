/* Interceptors [
    // Add Token to each request
    // If Response is 401 Logout
]
*/
import { storeToRefs } from 'pinia';
import { ofetch } from 'ofetch'
import { useAuthStore } from '~/store/auth'


export default defineNuxtPlugin((_nuxtApp) => {
    

  const router = useRouter();
  const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
  const { authenticated, token } = storeToRefs(useAuthStore());


  globalThis.$fetch = ofetch.create({
    baseURL: 'http://localhost:3000/',
    onRequest ({ _request, options }) {
      if (authenticated) {
        options.headers = { Authorization: `Bearer ${token.value}` }
      } else { // If not authenticated
        logUserOut();
        router.push('/login');
      }
    },


    onResponse({ request, response, options }) {
        if(response.status == 401) {
            logUserOut();
            router.push('/login');
        }
    },

    onResponseError({ request, response, options }) {
        if(response.status == 401) {
            logUserOut();
            router.push('/login');
        }
    }
  })
})