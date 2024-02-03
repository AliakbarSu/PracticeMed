<template>
  <div
    class="min-h-screen flex flex-grow items-center justify-center bg-gray-50"
  >
    <div class="rounded-lg bg-white p-8 text-center shadow-xl">
      <p class="text-gray-600">
        Oops! Looks like your not authorized to view this page.
      </p>
      <p
        class="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        Redirecting...
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";

const route = useRoute();
const router = useRouter();

const auth0 = process.client ? useAuth0() : undefined;

const redirectPath = route.query.redirect_to;
if (!auth0?.isAuthenticated.value) {
  await auth0?.loginWithRedirect({
    appState: {
      target: redirectPath,
    },
  });
} else {
  if (redirectPath) {
    router.push(redirectPath);
  } else {
    console.warn("No redirect path");
  }
}
</script>
