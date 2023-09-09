<template>
    <h1>Users</h1>
    <div v-if="pending">PENDING...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <div class="alert alert-success" v-if="success">{{ success }}</div>
    <div class="table-responsive" v-if="users.length">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in filteredUsers" :key="index">
                    <td>{{ user.id }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <nuxt-link :to="'/users/'+user?.id" class="btn btn-info btn-sm me-2">Edit</nuxt-link>
                        <button @click.prevent="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="d-flex justify-content-between align-items-center">
            <base-pagination :meta="{'current_page': current_page, 'last_page': last_page}" @emit-pagination="current_page=$event" />
            <base-button color="primary" @click="sort()" class="text-uppercase">Sort {{ sortType }}</base-button>
        </div>
    </div>
    <div v-else-if="!pending">
        No Users
    </div>
</template>
<script lang="ts" setup>
    // Fetch All Users
    const users = ref([]);
    let current_page = ref(1);
    let last_page = ref(1);
    let limit = ref(3);
    let sortType = ref("desc");

    const { data: response, pending } = await useLazyFetch('users', {
        server: false,
        method: 'get',
    })
    // Because Response might start out null, you won't have access
    watch(response, () => {
        if(response.value.status) {
            users.value = response.value.data;
            last_page.value = Math.ceil(users.value.length / limit.value); // Calculate number of pagination inputs [3 users per page]
        }
    })
    const filteredUsers = computed(() => { // Displayed in table
        return users.value.filter((user, index) => index >= (current_page.value-1)*limit.value && index < ((current_page.value-1)*limit.value)+limit.value);
    })
    const sort = (()=>{
        if(sortType.value == 'asc') {
            users.value.sort(function(a, b){return a.id - b.id});
            sortType.value = 'desc';
        } else if(sortType.value == 'desc') {
            users.value.sort(function(a, b){return b.id - a.id});
            sortType.value = 'asc';
        }
    });

    // Delete User
    const error = ref("");
    const success = ref("");
    const deleteUser = (async (id: number)=>{
        error.value = "";
        success.value = "";
        const { data: response, pending } = await useLazyFetch(`users/${id}`, {
            server: false,
            method: 'delete',
        })
        if(response.value.status) {
            // Get user index to remove it from users "table" without reloading
            const user = users.value.findIndex(user => user.id == id);
            if (user >= 0) {
                users.value.splice(user, 1);
            }
            success.value = response.value?.msg;
            last_page.value = Math.ceil(users.value.length / limit.value); // Calculate number of pagination inputs [3 users per page]
        } else {
            error.value = response.value?.msg;
        }
        // Hide notification after 4 seconds
        setTimeout(()=>{
            success.value = "";
            error.value = "";
        }, 4000);
        
    })
</script>
<style scoped>
</style>