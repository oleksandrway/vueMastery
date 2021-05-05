<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @input="updateValue" v-on="listeners">
      <option
        :selected="option === value"
        v-for="option in options"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "../../mixins/formFieldMixin";
export default {
  name: "BaseSelect",
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  mixins: [formFieldMixin],
};
</script>

<style lang="scss" scoped>
</style>
