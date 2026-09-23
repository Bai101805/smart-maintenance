<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  min-height: 100%;
  margin: 0;
}

body {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
  background: #eef5ff;
  color: #1f2937;
}

button,
input {
  font-family: inherit;
}
</style>