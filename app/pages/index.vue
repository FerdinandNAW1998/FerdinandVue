<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})

const {
  user,
  logout
} = useAuth()

</script>

<template>

  <div>

    <header>

      <h1>
        Home Dashboard
      </h1>

      <button
        @click="logout"
      >
        Logout
      </button>

    </header>

    <main>

      <h2>
        Welcome,
        {{ user?.username }}
      </h2>

      <p>
        Role:
        {{ user?.role }}
      </p>

      <NuxtLink
        v-if="
          user?.role === 'admin'
        "
        to="/admin"
      >
        Admin Dashboard
      </NuxtLink>

    </main>

  </div>

</template>