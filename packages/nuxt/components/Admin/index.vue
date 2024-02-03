<template>
  <AdminUsers :users="users" @selectUser="selectUser" />
  <div ref="testsPanelRef" class="px-5 mt-5">
    <AdminTests :user="user" />
  </div>
</template>

<script lang="ts" setup>
import { useAdminStore } from "../../src/store/admin";
import { type User } from "../../src/types/user";

const user = ref({});
const testsPanelRef = ref<HTMLElement | null>(null);
const adminStore = useAdminStore();

if (adminStore.users.length === 0) {
  await adminStore.fetchUsers();
}

const users = computed(() => adminStore.users || []);

const selectUser = (userObj: User) => {
  const foundUser = users.value.find((u) => u.userId === userObj.userId);
  if (foundUser) {
    user.value = foundUser;
    testsPanelRef.value?.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
