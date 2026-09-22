<script setup lang="ts">

definePageMeta({
  middleware: [
    'auth',
    'admin'
  ]
})

</script>

<template>

  <div>

    <h1>
      Admin Dashboard
    </h1>

    <p>
      Only administrators can
      access this page.
    </p>

  </div>

</template>