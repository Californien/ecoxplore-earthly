<template>
  <div>
    <button @click="logout_">Logout</button>
  </div>
</template>

<script lang="ts" setup>
  const { logout } = useStrapiAuth();
  const router = useRouter();

  function logout_() {
    logout();
    router.push("/auth/login");
  }
</script>
