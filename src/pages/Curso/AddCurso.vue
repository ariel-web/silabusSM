<template>
  <div class="q-px-xl">
    <h6>Agregar Curso</h6>
    <SubirFotoCurso @getValues="setValues" />
    <pre>{{ isAuthenticated }}</pre>
    <q-form class="q-glutter-md" @submit.prevent="ProcesarForularioCurso">
      <q-input label="Nombre" v-model="nombre" />
      <q-input label="Grado" v-model="grado" />
      <q-input label="Seccion" v-model="seccion" />
      <q-btn label="Registrar" type="submit" color="primary" class="q-mt-xl" />
    </q-form>

    <div v-if="path !== ''">
      <pre>{{ (linkFOTO = path) }}</pre>
    </div>
    <div><h2>{{anio }}</h2></div>
    <div>
      <p v-if="isAuthenticated" ></p> 
    </div>


  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { storage } from "boot/firebase";
import SubirFotoCurso from "../../components/SubirFotoCurso.vue";

const storageRef = storage.ref();
export default {
  components: { SubirFotoCurso },
  setup() {

    const nombre = ref("");
    const grado = ref("");
    const seccion = ref("unica");
    const anio = ref(new Date().getFullYear());
    const value = ref(false);
    const linkFOTO = ref("")

    const { isAuthenticated, user } = useAuth(firebase.auth);
    
    const ProcesarForularioCurso = async () => {
      if (!nombre.value.trim() || !grado.value.trim() || !seccion.value.trim()) {
        console.log("CAMPOS VACIOS");
        return;
      }
      try {      
          await db.collection("cursos").add({
              curso: nombre.value,
              grado: grado.value,
              seccion: seccion.value,
              anio: anio.value,
              url: linkFOTO.value,
          })
          .then((docRef) => {
            db.collection('cursos').doc(docRef.id).update({
              uid: docRef.id
            });     
            console.log("Agregado!!")
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
          });

        nombre.value = "";
        grado.value = "";
        
      }catch (error) {
        console.log( error );
      }
    };

    return {
      nombre,
      grado,
      seccion,
      anio,
      ProcesarForularioCurso,
      isAuthenticated,
      linkFOTO,
    };
  },

  data() {
    return {
      path: "",
    };
  },
  methods: {
    setValues(obj) {
      this.path = obj.linkPDF;
      console.log(this.path);
    },
  },

};
</script>
