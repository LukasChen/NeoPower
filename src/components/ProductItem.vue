<template>
  <div v-show="showProduct">
    <slot/>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'productItem',
  props: {
    current: String,
    data: Array | String
  },
  computed: {
    showProduct() {
      return this.current ? this.data.includes(this.current) : true;
    }
  }
}
</script>
