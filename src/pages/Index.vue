<template>
  <q-page padding style="margin-bottom:60px;">
    <Registro v-if="isAuthenticated === false"/>
    <div>
      <div v-if=" tab === 'home'" >
        <DocMain />
        <GradosMain />
        <CursosMain />
        </div>
      <div v-if="tab === 'perfil'">
        <Perfil />
      </div>
      <div v-if="tab === 'docentes'">
        <Docentes />
      </div>
      
    </div>

  </q-page>

  <div style="width:100%; position:fixed; bottom:0; height:55px; ">
    <q-tabs
      v-model="tab"
      indicator-color="transparent"
      active-color="negative"
      class="bg-white text-grey-7 shadow-2"
    >
      <q-tab name="cursos" > 
        <q-icon name="article"  style="font-size:30px; margin-top:-10px;"/>
        <span style="font-size:9px; ">Cursos</span>
      </q-tab>
      <q-tab name="recientes"> 
        <q-icon name="schedule"  style="font-size:30px; margin-top:-10px;"/>
        <span style="font-size:9px;">recientes</span>
      </q-tab>
      <q-tab name="home"> 
        <q-icon name="touch_app" style="margin-top: -2px; font-size:40px; border: solid 1px; border-radius:50%; padding:5px;" @click="tab = 3" />
        <span style="font-size:9px;">home</span>
      </q-tab>
      <q-tab name="docentes"> 
        <q-icon name="supervisor_account"  style="margin-top:-10px;font-size:30px;"/>
        <span style="font-size:9px;">Docentes</span>
      </q-tab>
      <q-tab name="perfil"> 
        <q-icon name="account_circle"  style="font-size:30px; margin-top:-10px;"/>
        <span style="font-size:9px;">perfil</span>
      </q-tab>

    </q-tabs>
</div>
</template>

<script>
import { db } from "boot/firebase";
import ItemHorario from "../components/ItemHorario.vue";

import { ref } from "vue";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { useQuasar } from "quasar";
import Registro from "../components/Registro.vue";
import Usuarios from "../components/Usuarios.vue";
import DocMain from "../components/DocMain.vue";
import GradosMain from "../components/GradosMain.vue";
import HorarioMain from "../components/HorariosMain.vue";
import CursosMain from "../components/CursosMain.vue";
import Perfil from './perfil/Perfil.vue'
import Docentes from './Docentes.vue'


export default {
  name: "PageIndex",
  components: { Registro, DocMain, GradosMain, HorarioMain, CursosMain, Perfil, Docentes },

  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);
    const slide = ref(1);
    const tab = ref("home");
    const tabb = ref("");

    //horario
    const dialog = ref(false);
    const position = ref("top");
    const horarioseleccionado = ref("");
    const horarios = ref([]);
    const silabos = ref([]);

    db.collection("silabus")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          silabos.value = [...silabos.value, doc.data()];
          localStorage.setItem("silabos", JSON.stringify(silabos.value));
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    db.collection("horarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          horarios.value = [...horarios.value, doc.data()];
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 1000,
      // rowsNumber: xx if getting data from a server
    });

    return {
      isAuthenticated,
      slide,

      horarioseleccionado,
      horarios,
      filter: ref(""),
      pagination,
      tab,
    };
  },
};
</script>

<style>

.tablahorarios {
  border: none;
  background: white;
  box-shadow: none;
}
.ContainerItemUsuario {
  margin: auto;
  width: 95%;
  padding: 8px;
  border-bottom: solid 0.1px #00000015;
}
</style>
