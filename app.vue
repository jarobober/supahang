<template>
  <div class="hero">
    <div class="overlay"></div>
    <div class="content">
      <div class="absolute top-0 left-0 p-4 flex items-center justify-between">
        <div class="flex items-center">
          <img src="/images/logo.svg" alt="Nuxt Logo" width="25" class="mr-1" />
          <span class="font-bold text-lg">supahang</span>
        </div>
        <WaitlistModal />
      </div>
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.hero {
  background-image: url('/images/background-rocks.jpg');
  position: relative;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #1f2937;
  opacity: 0.7;
  z-index: 1;
}

.sh-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(48, 60, 102, 0.9);
}

.content {
  /* Position relative to the hero container */
  position: relative;
  /* Place content above the overlay */
  z-index: 2;
  /* Center content */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Text styles */
  color: white;
  text-align: center;
}
</style>
