<template>
  <div class="app-root">
    <FileInput @input="inputHandler"/>
    <template v-if="files">
      <div class="files" role="list">
        <div v-for="(file, fileIndex) in files" :key="file.name + file.size + file.lastModified" class="files__item" role="listitem">
          <img src="../assets/image-icon.png" loading="lazy" width="20" height="20" alt="image icon">
          <span class="files__name">{{file.name}}</span>
          <span class="files__size">{{formatBytes(file.size)}}</span>
          <button class="files__delete" @click="removeImage(fileIndex)">❌</button>
        </div>
      </div>
<!--      <input v-model="quality" type="text" placeholder="Качество картинки от 0.1 до 1" min="0.1" max="1">-->
      <button class="files__download" @click="convertAll">Covert all and download</button>
    </template>
  </div>
</template>

<script>
import FileInput from "@/components/FileInput.vue";
import { formatBytes } from "@/utils";

export default {
  name: "HomeView",
  data: () => ({
    files: null,
    quality: 1
  }),
  components: { FileInput },
  methods: {
    formatBytes,
    inputHandler(files) {
      this.files = files
    },
    removeImage(fileIndex) {
      this.files = this.files.filter((file, index) => index !== fileIndex)
    },
    convertAll() {
      this.files.forEach(async (file) => {
        const imageBitmap = await createImageBitmap(file);

        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        const outputFile = await new Promise((resolve) =>
          canvas.toBlob(resolve, 'image/webp', parseFloat(this.quality))
        );
        const link = document.createElement('a');
        link.download = file.name.split('.').slice(0, -1).join('.') + '.webp';
        link.href = URL.createObjectURL(outputFile);
        link.click();
      })
    }
  }
};
</script>

<style lang="scss">
.app-root {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
.files {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  &__item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 8px;
    background: #0d1117;
    border: 1px solid #30363d;
    border-radius: 8px;
  }
  &__size {
    margin-left: auto;
  }
  &__download {
    margin-top: 40px;
    background: #f33;
    padding: 12px;
    border: 0;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: opacity .3s linear;
    font-size: 20px;
    &:hover {
      opacity: 0.85;
    }
  }
}
</style>