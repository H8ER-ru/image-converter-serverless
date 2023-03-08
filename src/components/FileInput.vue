<template>
  <div class="file-input">
    <button class="file-input__button" @click="choiceFiles">
      Choice files
    </button>
    <input ref="input" @change="inputChange" type="file" multiple accept=".png,.jpg,.jpeg,.webp">
  </div>
</template>

<script setup lang="ts">
import {ref, defineEmits} from "vue";

const emit = defineEmits(['input'])

const input = ref<HTMLInputElement>(null)

const choiceFiles = (e: Event) => {
  e.preventDefault()
  input.value.click()
}

const inputChange = (event: any) => {
  const filesArray = Object.values(event.target.files)
  emit('input', filesArray)
}

</script>

<style scoped lang="scss">
.file-input {
  input {
    display: none;
    appearance: none;
  }
  &__button {
    background: #f33;
    padding: 8px;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: opacity .3s linear;
    &:hover {
      opacity: 0.85;
    }
  }
}
</style>