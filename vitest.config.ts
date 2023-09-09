import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [Vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => ['base-input','base-button'].includes(tag),
      }
    }
  })],
  test: {
    globals: true,
    environment: 'happy-dom'
  },
})