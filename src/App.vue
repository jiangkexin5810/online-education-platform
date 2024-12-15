<template>
  <div id="app">
    <nav class="nav-menu">
      <router-link to="/users">用户管理</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.nav-menu {
  padding: 15px;
  background-color: #f8f9fa;
}

.nav-menu a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
}

.nav-menu a:hover {
  color: #007bff;
}

.nav-menu a.router-link-active {
  color: #007bff;
  font-weight: bold;
}
</style>