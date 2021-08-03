<template>
  <div>
    <div>
      <q-file
        color="purple-12"
        v-model="fileN"
        type="file"
        @change="previewImage"
        label="Label"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>
    </div>
    <div>
      <p>
        progress: {{ uploadValue.toFixed() + "%" }}
        <progress :value="uploadValue" max="100"></progress>
      </p>
    </div>
    <div>
      <img class="preview" :src="picture" />
      <br />
      <q-btn @click="onUpload">Subir Imagen</q-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Upload",
  data() {

    return {
      imageData: null,
      picture: null,
      uploadValue: 0,
      fileN: "",
      pathDocente: null,
    };
  },
  methods: {
    previewImage(event) {
      (this.uploadValue = 0),
        (this.picture = null),
        (this.imageData = event.target.files[0]);
      fileN = this.imageData.name;
    },
    onUpload() {
      this.picture = null;
      const storageRef = firebase
        .storage()
        .ref("documentos/silabus/" + `${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url;
             this.$emit("getValues", {
              linkPDF: this.picture,
            });
          });
        }
      );
    },
  },
};
</script>

<style scoped>
img.preview {
  width: 200px;
}
</style>
