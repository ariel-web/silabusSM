<template>
<div class="q-pa-sm">
  <span style="font-size: 18px; font-weight: 500; margin-left: 0px"
    >Horarios</span
  >
  <div class="q-col-gutter-md row items-start" style="margin-top: 10px">
    <div class="col-6" v-for="item in horarios" :key="item.uid">
      <RouterLink
        :to="{
          path: `/tableros/${item.uid}`,
          params: { row: item.uid },
        }"
      >
        <ItemHorario :item="item" />
      </RouterLink>
    </div>
  </div>
</div>
</template>

<script>
import { db } from "boot/firebase";
import ItemHorario from "../components/ItemHorario.vue";

import { ref } from "vue";
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";

export default {
  name: "PageIndex",
  components: { ItemHorario },

  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);
    const slide = ref(1);

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
