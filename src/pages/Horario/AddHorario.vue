<template>
  <div class="q-px-xl">
    <h6>Crear Horario</h6>
    <pre>{{ isAuthenticated }}</pre>
    <q-form class="q-glutter-md" @submit.prevent="ProcesarForularioHorario">
      <q-input label="Nombre" v-model="nombre" />
      <q-input type="number" label="Filas" style="max-width: 300px" v-model="filas"/>
      <q-input type="number" label="Columnas" style="max-width: 300px" v-model="columnas"/>
      <q-btn label="Registrar" type="submit" color="primary" class="q-mt-xl" />
    </q-form>
    <div>
      <p v-if="isAuthenticated" ></p>
      <pre>{{user.uid}}</pre> 
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { storage } from "boot/firebase";
const storageRef = storage.ref();
export default {
  setup() {

    const nombre = ref("");
    const filas = ref(6);
    const columnas = ref(6);
    const anio = ref(new Date().getFullYear());
    const value = ref(false);

    const { isAuthenticated, user } = useAuth(firebase.auth);
    
    const ProcesarForularioHorario = async () => {
      if (!nombre.value.trim()) {
        console.log("CAMPOS VACIOS");
        return;
      }
      try {   
          await db.collection("horarios").add({
              nombre: nombre.value,
              filas: filas.value,
              columnas: columnas.value,
              anio: anio.value,
              usuario : user.value.uid,
          })
          .then((docRef) => {
            db.collection('horarios').doc(docRef.id).update({
              uid: docRef.id
            });     
            console.log("Agregado!!")
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });

        nombre.value = "";
        941421354

        
      }catch (error) {
        console.log( error );
      }
    };

    return {
      nombre,
      filas,
      columnas,
      ProcesarForularioHorario,
      isAuthenticated,
      user,
    };
  },
  data() {
    return {
      path: "",
      u: "xD"
    };
  },
  methods: {
    setValues(obj) {
      this.path = obj.pathDocente;
      console.log(this.path);
    },

    obterURL(){
      const refImg = storageRef.child(this.path);
      refImg.getDownloadURL().then(function(url){ 
        return url
      }).catch(function(error) {
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
    }
  },
};
</script>
