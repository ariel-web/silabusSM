<template>
  <div class="formularioImagenDocente">
    <form @submit.prevent="subirImagen" enctype="multipart/form-data">
      <input @change="clickimagen($event)" type="file" accept="image/*" />
      <button type="submit">Subir Imagen</button>
      <p>progress:<progress max="100"></progress></p>
    </form>
    <img :src="lin" alt="">
    <pre>{{ pathDocente }}</pre>
    <pre>{{ lin }}</pre>
  </div>
</template>
<script>
import { ref } from 'vue'
import firebase from "firebase";
import { storage } from "boot/firebase";
const storageRef = storage.ref();
const link = "";
export default {
  setup() {
    const dPDF = ref()
    const lin = ref()
    return {
      dPDF,
      lin

    }
  },
  data() {
    return {
      imagenes: [],
      imagen: null,
      linkDocente:null,
      picture:null,
      pathDocente: null,
    };
  },
  methods: {
    clickimagen(e) {
      this.imagen = e.target.files[0];
      this.dPDF = e.target.files[0];
      console.log(this.dPDF);
    },
    
    subirImagen() {
      const refDOC = storageRef.child("documentos/silabus/" + this.imagen.name);
      console.log(refDOC.fullPath);
      this.pathDocente = refDOC.fullPath;
      this.$emit("getValues", {
        pathDocente: this.pathDocente,
      });
      refDOC.getDownloadURL().then(function(url){
      // Insert url into an <img> tag to "download"
     }).catch(function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });

      const metadata = { contentType: "img/jpg" };
      refDOC.put(this.imagen, metadata).then((e) => console.log(e));
    
    },
  },
};
</script>
