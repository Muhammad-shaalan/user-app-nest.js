<template>
    
    <h1>Edit User</h1>
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
    <form @submit="handleSubmit">
        <div v-if="errors?.serverErrors?.length" class="bg-danger p-3">
            <div class="text-white text-capitalize" v-for="(error, index) in errors.serverErrors" :key="index">
                {{ error }}
            </div>
        </div>
        <div class="alert alert-success" v-if="success">
        {{ success }}
        </div>
        <base-input
        type="email"
        label="Email Address"
        placeholder="Enter Your Email Address"
        v-model="formData.email"
        @blur="validate('email')"
        :error="errors.email"
        :isRequired="true"
        />
        <base-input
        type="text"
        label="Name"
        placeholder="Enter Your Full Name"
        v-model="formData.name"
        @blur="validate('name')"
        :error="errors.name"
        :isRequired="true"
        />
        <base-button color="success" type="submit" @click.prevent="handleSubmit"
        >Update</base-button>
    </form>
</template>
  
<script lang="ts" setup>
import * as yup from "yup";
const route = useRoute();
const router = useRouter();


// Check if id params is valid
definePageMeta({
  validate: async (route) => {
    return /^\d+$/.test(route.params.id)
  }
});


// Get Current User
const { data: response, pending } = await useLazyFetch(`users/${route.params.id}`, {
    server: false,
    method: 'get',
})


// Because Response might start out null, you won't have access
watch(response, () => {
    if(response.value.status) {
        formData.value = response.value.data;
    } else { // Redirect if user is not existed
        router.push("/");
    }
})


// Edit User Actions
// Define form data and errors and success notifications
const formData = ref({
  email: "",
  name: "",
});
let errors = ref({
  email: "",
  name: "",
  serverErrors: {}
});
const success = ref("");


// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
});

// Validation function [Triggered on blur]
function validate(field: any) {
  schema
    .validateAt(field, formData.value)
    .then(() => {
      errors.value[field] = "";
    })
    .catch((err) => {
      errors.value[field] = err.message;
    });
}


// Form submission handler [Trigger validation function on submit] and call submitForm if validation is true
const handleSubmit = () => {
  schema
    .validate(formData.value, { abortEarly: false })
    .then(() => {
      errors.value = {};
      submitForm();
    })
    .catch((err) => {
      err.inner.forEach((error) => {
        errors.value[error.path] = error.message;
      });
    });
};


// Submit form to server
const submitForm = async () => {
    errors.value = {};
    success.value = "";
    const response = await $fetch(`http://localhost:3000/users/${route.params.id}`, {
        method: 'put',
        body: formData.value,
    }).catch((error) => {
        errors.value.serverErrors = error.data.message;
    });
    if(response?.status) {
        success.value = response?.msg;
        setTimeout(()=>{
            router.push("/users");
        }, 1500)
    } 
}
</script>