<template>
    <div class="form-group mb-3">
      <slot name="label">
        <label v-if="label" class="form-control-label" :class="labelClasses">
          {{ label }}
          <span v-if="isRequired">*</span>
        </label>
      </slot>
      <div>
        <input
          :type="type"
          class="form-control"
          :class="getClasses(size, valid, classes)"
          :name="name"
          :id="id"
          :accept="accept"
          :value="modelValue"
          :placeholder="placeholder"
          :isRequired="isRequired"
          :disabled="disabled"
          v-on="listeners"
        />
      </div>
      <div class="error-msg mt-2 text-capitalize" v-if="error">
        {{ error }}
      </div>
    </div>
  </template>
  
<script lang="ts">
  export default {
    name: "base-input",
    props: {
      accept: {
        type: String,
        default: "",
      },
      size: {
        type: String,
        default: "default",
      },
      error: {
        type: String,
        default: "",
      },
      valid: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      name: String,
      id: String,
      value: String,
      modelValue: {
        type: [String, Number],
        description: "Input value",
      },
      placeholder: String,
      type: String,
      isRequired: Boolean,
      label: {
        type: String,
        description: "Input label (text before input)",
      },
      labelClasses: {
        type: String,
        description: "Input label css classes",
      },
      classes: {
        type: String,
      },
    },
    data() {
      return {
        focused: false,
      }
    },
    computed: {
      listeners() {
        return {
          input: this.updateValue,
          focus: this.onFocus,
          blur: this.onBlur,
        };
      },
    },
    methods: {
      updateValue(evt: any) {
        let value = evt.target.value;
        this.$emit("update:modelValue", value);
      },
      onFocus(value: any) {
        this.focused = true;
        this.$emit("focus", value);
      },
      onBlur(value: any) {
        this.focused = false;
        this.$emit("blur", value);
      },
      getClasses: (size : String | null, valid: Boolean, classes: String | undefined) => {
        let sizeValue : String | null, isValidValue: String | Boolean;
        sizeValue = size ? `form-control-${size}` : null;
        isValidValue = valid ? valid : "invalid";
        return `${sizeValue || ""} ${isValidValue || ""} ${classes || ""}`;
      },
    },
  };
</script>
<style lang="scss" scoped>
  label{
    color: #414141;
    font-size: 12px;
  }
  input{
    border-radius: 0;
    font-size: 14px;
    color: #414141;
    height: 40px;
  }
  .error-msg{
    color: #DB0000;
    font-weight: 400;
    font-size: 14px;
  }
</style>
  