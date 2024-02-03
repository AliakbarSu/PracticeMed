<template>
  <AccountComponentsSecurity :loading="loading" :profile="profile" />
</template>

<script lang="ts" setup>
import { useAppStore } from "../../src/store/main";

const store = useAppStore();

const profile = computed(() => store.profile);
const loading = computed(() => store.loading);
</script>
