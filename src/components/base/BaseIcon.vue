<template>
  <div class="icon-wrapper">
    <svg class="icon" :width="width" :height="height">
      // here was "xlink:href" i replaced to 'href'
      <use v-bind="{ href: '/feather-sprite.svg#' + name }" />
    </svg>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => ["users", "map"].includes(value),
    },
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  margin-right: 6px;
}
</style>
