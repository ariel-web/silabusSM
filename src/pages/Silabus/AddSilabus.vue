<template>
  <div class="q-px-xl">
    <h6>Agregar Curso</h6>
    <pre>{{ isAuthenticated }}</pre>
    <div class="" v-for="c in cursos" :key="c.uid"></div>
    <q-form class="q-glutter-md" @submit.prevent="ProcesarForularioSilabus">

      <q-badge color="secondary" multi-line> Model: "{{ cur }}" </q-badge>
      <q-select
        filled
        v-model="cur"
        emit-value
        option-value="uid"
        option-label="curso"
        map-options
        :options="cursos"
        label="Seleccionar Curso"
        color="primary"
        clearable
        options-selected-class="text-deep-orange"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
            <q-item-section>
              <q-item-label v-html="scope.opt.curso" />
              <q-item-label caption
                >{{ scope.opt.grado }} {{ scope.opt.seccion }}</q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-badge color="secondary" multi-line> Model: "{{ doc }}" </q-badge>
      <q-select
        filled
        v-model="doc"
        emit-value
        option-value="uid"
        option-label="nombres"
        map-options
        :options="docentes"
        label="Seleccionar Docente"
        color="primary"
        clearable
        options-selected-class="text-deep-orange"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">
           <q-item-section avatar>
            <q-avatar style="width:30px; height:30px">
              <img :src="scope.opt.foto">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            {{scope.opt.nombres}}
          </q-item-section>
          </q-item>
        </template>
      </q-select>

      <SubirPDF  @getValues="setValues" />

      <q-input label="Nombre" v-model="nombre" />
    
      <q-btn label="Registrar" type="submit" color="primary" class="q-mt-xl" />
    </q-form>
    <div v-if="path !== ''"><pre>{{ linkPDF = path }}</pre></div>
    <div>
      <pre>{{ cursos }}</pre>
    </div>
    <div>
      <pre>{{ docentes }}</pre>
    </div>
    <div>
      <p v-if="isAuthenticated"></p>
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
import SubirPDF from '../../components/SubirPDF.vue'


export default {
  components: {SubirPDF},
  setup() {
    const nombre = ref("");
    const anio = ref(new Date().getFullYear());
    const cur = ref("");
    const doc = ref("");
    const cursos = ref([]);
    const docentes = ref([]);
    const linkPDF = ref("")

    db.collection("cursos")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          cursos.value = [...cursos.value, doc.data()];
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    db.collection("docentes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          docentes.value = [...docentes.value, doc.data()];
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    const { isAuthenticated, user } = useAuth(firebase.auth);

    const ProcesarForularioSilabus = async () => {
      if (
        !nombre.value.trim() ||
        !doc.value.trim() ||
        !cur.value.trim() 
      ) {
        console.log("CAMPOS VACIOS");
        return;
      }
      try {
        await db
          .collection("silabus")
          .add({
            nombre: nombre.value,
            docenteID: doc.value,
            cursonID: cur.value,
            anio: anio.value,
            url: linkPDF.value          
          })
          .then((docRef) => {
            db.collection("silabus").doc(docRef.id).update({
              uid: docRef.id,
            });
            console.log("Agregado!!");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });

        nombre.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      nombre,
      anio,
      ProcesarForularioSilabus,
      isAuthenticated,
      cursos,
      docentes,
      cur,
      doc,
      linkPDF,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLocaleLowerCase();
          options.value = stringOptions.filter(
            (v) => v.toLocaleLowerCase().indexOf(needle) > -1
          );
        });
      },

      setModel(val) {
        model.value = val;
      },
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
  }
};
</script>
