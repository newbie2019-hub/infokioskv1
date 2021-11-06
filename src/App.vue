<template>
  <div id="app" style="overflow:hidden">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style>
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-3rem);
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}
</style>
