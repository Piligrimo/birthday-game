
<script setup>
  import { computed } from 'vue';
  import { useStore } from '../store.js';
  import NotifyChips from './NotifyChips.vue';
  import NotifyError from './NotifyError.vue';

  const store = useStore()
  const notifications = computed(() => {
    return store.notifications
  })

  const getComponent = (type) => {
    return type === 'chips' ? NotifyChips : NotifyError
  }
</script>

<template>
  <div class="notifications">
    <component 
      v-for="notification in notifications" 
      :is="getComponent(notification.type)"
      :notification="notification"
    />
  </div>
</template>

<style scoped>
  .notifications {
    position: absolute;
    top: 10px;
    right: 10px;
  }
</style>