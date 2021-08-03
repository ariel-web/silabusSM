<template>
  <div class="q-px-xl">
    <h6>Agregar Docente</h6>
    <pre>{{ isAuthenticated }}</pre>
    <FormularioImagen @getValues="setValues" />
    <q-form class="q-glutter-md" @submit.prevent="ProcesarForularioDocente">
      <q-input label="Nombres" v-model="nombres" />
      <q-input label="Apellidos" v-model="apellidos" />
      <q-input label="Celular" v-model="celular" />
      <q-btn label="Registrar" type="submit" color="primary" class="q-mt-xl" />
    </q-form>
    <div>
      <pre v-if="path !== null ? foto = path : foto='fail' " hidden>{{ foto }}</pre>
      <p v-if="isAuthenticated" ></p> 
    </div>
  </div>
</template> 
<script>
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import FormularioImagen from "../../components/FormularioImagen.vue";
import { storage } from "boot/firebase";
const storageRef = storage.ref();
export default {
  components: { FormularioImagen },
  setup() {

    const nombres = ref("");
    const apellidos = ref("");
    const celular = ref("");
    const foto = ref("");
    const value = ref(false);

    const { isAuthenticated, user } = useAuth(firebase.auth);
    
    const ProcesarForularioDocente = async () => {
      if (!nombres.value.trim() || !apellidos.value.trim() || !celular.value.trim()) {
        console.log("CAMPOS VACIOS");
        return;
      }
      try {   
          
          await db.collection("docentes").add({
              nombres: nombres.value,
              apellidos: apellidos.value,
              celular: celular.value,
          })
          .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
                    const refImg = storageRef.child(foto.value);
                    refImg.getDownloadURL().then(function(url){ 
                      db.collection('docentes').doc(docRef.id).update({
                        uid: docRef.id,
                        foto: url,
                      });     
                      
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
         
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });

        nombres.value = "";
        apellidos.value = "";
        celular.value = "";

        
      }catch (error) {
        console.log( error );
      }
    };

    return {
      nombres,
      apellidos,
      celular,
      foto,
      ProcesarForularioDocente,
      isAuthenticated,
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
