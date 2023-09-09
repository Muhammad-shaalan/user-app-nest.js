<template>
    <button class="btn mb-0" :class="getClasses(variant, color, size, fullWidth, active)" :type="type">
      <slot />
    </button>
</template>
  
<script lang="ts">
  export default {
    name: "argon-button",
    props: {
      color: {
        type: String,
        default: "",
      },
      size: {
        type: String,
        default: "md",
      },
      variant: {
        type: String,
        default: "fill",
      },
      fullWidth: {
        type: Boolean,
        default: false,
      },
      active: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String as () => 'button' | 'submit' | 'reset' | undefined,
        default: "button",
      },
    },
    methods: {
      getClasses: (variant: string, color: string, size: string, fullWidth: Boolean, active: any) => {
        let colorValue, sizeValue, fullWidthValue, activeValue;
  
        // Setting the button variant and color
        if (variant === "gradient") {
          colorValue = `bg-gradient-${color}`;
        } else if (variant === "outline") {
          colorValue = `btn-outline-${color}`;
        } else {
          colorValue = `btn-${color}`;
        }
  
        sizeValue = size ? `btn-${size}` : '';
  
        fullWidthValue = fullWidth ? `w-100` : '';
  
        activeValue = active ? `active` : '';
  
        return `${colorValue} ${sizeValue} ${fullWidthValue} ${activeValue}`;
      },
    },
  };
</script>
<style lang="scss" scoped>
    button {
      border-radius: 0;
    }
</style>