<template>
    <div class="navbar" v-if="authenticated">
        <div class="container">
            <ul class="list-unstyled d-flex align-items-center mb-0">
                <li class="me-3">
                    <nuxt-link to="/">Home</nuxt-link>
                </li>
                <li class="me-3">
                    <nuxt-link to="/users/">Users</nuxt-link>
                </li>
                <li class="me-3">
                    <nuxt-link to="/users/form">New User</nuxt-link>
                </li>
                <li class="loginBtn">
                    <nuxt-link @click="logout" to="/">Logout</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const router = useRouter();


const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const logout = () => {
  logUserOut();
  router.push('/login');
};
</script>
<style lang="scss" scoped>
.navbar {
    background: #333;
    padding: 10px;
    ul {
        li {
            a {
                color: #fff;
            }
        }
    }
}
</style>