<template>
  <div id="Header" class="w-full pt-8 pb-8">
    <h1 class="text-6xl">VUNITS</h1>
    <br />
    <p>
      A experimental unit converter project aimed at experimenting with <a href="https://vuejs.org" class="underline">Vue</a>, <a href="https://vitejs.dev" class="underline">Vite</a> and <a href="https://tailwindcss.com" class="underline">Tailwind</a>. Don't use for anything serious.
    </p>
  </div>
  <div id="Content"  class="bg-gray-200 rounded-md shadow-xl max-w-2xl pt-8 pb-8 w-full flex-col">
    <UnitConverter />
  </div>
  <div id="Footer" class="w-full pt-8 pb-8">
    <p>
      This website and the code that it is based on is stored
      in <a href="https://github.com/tommccracken/vunits" class="underline">this</a> repository and licensed under the
      MIT license. <br />NO WARRANTIES OF ANY KIND.
    </p>
    <br />
    <p>
      Made with ❤️ and ☕ by
      <a href="https://tommccracken.net" class="underline">Tom McCracken</a>
    </p>
    <p>&#169; Copyright 2021</p>
  </div>
</template>

<script setup>
import UnitConverter from "./components/UnitConverter.vue";
</script>
