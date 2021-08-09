<template>
  <div class="q-px-xl">
    <h6>Agregar Silabus</h6>
    <pre style="display:none;">{{ isAuthenticated }}</pre>
    <div class="" v-for="c in cursos" :key="c.uid"></div>
    <q-form class="q-glutter-md" @submit.prevent="ProcesarForularioSilabus">
      <q-select
        filled
        v-model="cur"
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
              <q-item-label caption>
              {{ scope.opt.grado }} {{ scope.opt.seccion }}
              </q-item-label
              >
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        filled
        v-model="doc"
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
              <q-avatar style="width: 30px; height: 30px">
                <img :src="scope.opt.foto" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              {{ scope.opt.nombres }}
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <div class="q-gutter-sm">
          <q-radio left-label v-model="origen" val="Link" label="Link de google" selected />
          <q-radio left-label v-model="origen" val="Archivo" label="Subir archivo "/>
      </div>

      <div v-if="origen === 'Archivo'" >
        <SubirPDF @getValues="setValues" />
      </div>
      <div v-if="origen === 'Link'">
        <q-input label="link de drive" v-model="linkPDF"/>
      </div>

      <q-btn label="Registrar" type="submit" color="primary" class="q-mt-xl" />
    </q-form>
    <div v-if="path !== ''">
      <pre>{{ (linkPDF = path) }}</pre>
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
import SubirPDF from "../../components/SubirPDF.vue";

export default {
  components: { SubirPDF },
  setup() {
    const nombre = ref("");
    const anio = ref(new Date().getFullYear());
    const cur = ref(null);
    const doc = ref(null);
    const cursos = ref([]);
    const docentes = ref([]);
    const linkPDF = ref("");
    const origen = ref("Link");

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
      try {
        await db
          .collection("silabus")
          .add({
            nombre: cur.value.curso+" "+cur.value.grado+" "+cur.value.seccion,
            docenteID: doc.value.uid,
            docenteNombre: doc.value.nombres,
            docenteFoto:doc.value.foto,
            docenteGrado: cur.value.grado,
            docenteSeccion: cur.value.seccion,
            cursonID: cur.value.uid,
            cursoNombre: cur.value.curso,
            anio: anio.value,
            url: linkPDF.value,
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

        linkPDF.value = "";
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
      origen,

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
  },
};
</script>
