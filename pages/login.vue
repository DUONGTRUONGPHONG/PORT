<script setup lang="ts">
import { Login } from "#build/components";
const { signIn, status } = useAuth();

if (status.value === "authenticated") {
  await navigateTo("/");
}
</script>

<template>
  <div>
    <Login slot-scope=""/>
  </div>
</template>
