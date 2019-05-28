<template>
  <li class="nav-item dropdown" :class="{ 'position-static': fullWidth }" 
  @mouseenter="onMouseOver" @mouseleave="onMouseOut">
    <a class="nav-link dropdown-toggle" :href="href" :class="{ active }">
      <slot name="name" />
    </a>
    <transition name="fade">
      <div v-show="isOpen" class="dropdown-menu mega-dropdown shadow" :style="{ width: width + 'em' }"
      aria-labelledby="NavbarDropdown">
        <slot />
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  name: 'MegaMenu',
  props: {
    fullWidth: Boolean,
    active: Boolean,
    width: Number,
    href: String
  },
  data: () => ({
    isOpen: false
  }),
  methods: {
    onMouseOver() {
      this.isOpen = true;
    },
    onMouseOut() {
      this.isOpen = false;
    }
  }
}
</script>
