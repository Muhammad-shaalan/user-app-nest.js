<template>
    <div class="pagination">
      <button
        @click="$emit('emitPagination', meta?.current_page - 1)"
        :disabled="meta?.current_page === 1"
      >
        Previous
      </button>
      <button 
          v-for="(page, index) in meta?.last_page" :key="index"
          @click="$emit('emitPagination', page)"
          :class="page == meta?.current_page ? 'active' : ''"
      >
          {{ page }}
      </button>
      <button
        @click="$emit('emitPagination', meta?.current_page + 1)"
        :disabled="meta?.current_page === meta?.last_page"
      >
        Next
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    meta: {
      type: Object,
    }
  })
  </script>
  <style lang="scss" scoped>
  button {
      background-color: transparent;
      border: 1px solid #ccc;
      padding: 4px 10px;
      color: #666;
      transition: all .2s ease-in;
      &:hover:not(:disabled), &.active{
          border-color: #0d6efd;
          background-color: #0d6efd;
          color: #fff;
      }
      &:disabled {
          background-color: #eee;
      }
  }
  </style>