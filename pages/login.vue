<template>
  <div class="login__form_container">
    <div class="form">
        <h2>Login</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="loading">Loading....</div>
        <form @submit="login">
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
                type="password"
                label="Password"
                placeholder="Enter Your Password"
                v-model="formData.password"
                @blur="validate('password')"
                :error="errors.password"
                :isRequired="true"
            />
            <base-button color="primary" :fullWidth="true" type="submit" @click.prevent="handleSubmit">Login</base-button>
        </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

const { authenticateUser } = useAuthStore();
const { authenticated, error, loading } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

import * as yup from "yup"; // For Validation Schema


// Define form data and errors
const formData = ref({
  email: "admin@example.com",
  password: "123456",
});


let errors = ref({
  email: "",
  password: "",
  serverErrors: {}
});


// Define validation schema
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
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
      login();
    })
    .catch((err) => {
      err.inner.forEach((error) => {
        errors.value[error.path] = error.message;
      });
    });
};
const router = useRouter();

const login = async () => {
  await authenticateUser(formData.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    router.push("/");
  }
};
</script>
<style lang="scss" scoped>
.error {
    background-color: #ec2424;
    color: #fff;
    padding: 8px 12px;
    text-transform: capitalize;
    margin-bottom: 20px;
}
.login__form_container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .form {
        background-color: #fff;
        width: 100%;
        max-width: 400px;
        padding: 20px 30px;
    }
}
.form-group {
    margin-bottom: 16px;
}
label {
    color: #666;
    display: block;
    margin-bottom: 10px;
}
input {
    display: block;
    border: 1px solid #ccc;
    padding: 12px 8px;
    width: 100%;
    outline: none;
}
button {
    background: #65d1d1;
    border: 0;
    padding: 8px 16px;
    color: #fff;
    display: block;
    width: 100%;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
}
</style>