<script setup lang="ts">

import * as yup from 'yup'

definePageMeta({
  layout: false
})

const username = ref('')
const password = ref('')

const errors = ref<string[]>([])

const loading = ref(false)

const schema = yup.object({
  username: yup
    .string()
    .required(
      'Username is required'
    ),

  password: yup
    .string()
    .required(
      'Password is required'
    )
    .min(
      6,
      'Password must be at least 6 characters'
    )
})

const login = async () => {

  errors.value = []

  try {

    /*
     * Client-side validation
     */
    await schema.validate(
      {
        username:
          username.value,

        password:
          password.value
      },
      {
        abortEarly: false
      }
    )

    loading.value = true

    /*
     * Login API
     */
    await $fetch(
      '/api/auth/login',
      {
        method: 'POST',

        body: {
          username:
            username.value,

          password:
            password.value
        }
      }
    )

    /*
     * Login successful
     */
    await navigateTo('/')

  } catch (error: any) {

    if (
      error.name ===
      'ValidationError'
    ) {

      errors.value =
        error.errors

    } else {

      errors.value = [
        error?.data?.message ??
        'Login failed'
      ]
    }

  } finally {

    loading.value = false
  }
}

</script>

<template>

  <div class="login-page">

    <div class="login-card">

      <h1>
        Dashboard Login
      </h1>

      <p>
        Sign in to continue
      </p>

      <form
        @submit.prevent="login"
      >

        <div>

          <label>
            Username
          </label>

          <input
            v-model="username"
            type="text"
            autocomplete="username"
          />

        </div>

        <div>

          <label>
            Password
          </label>

          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
          />

        </div>

        <div
          v-if="errors.length"
        >

          <p
            v-for="error in errors"
            :key="error"
          >
            {{ error }}
          </p>

        </div>

        <button
          type="submit"
          :disabled="loading"
        >

          {{
            loading
              ? 'Signing in...'
              : 'Login'
          }}

        </button>

      </form>

    </div>

  </div>

</template>