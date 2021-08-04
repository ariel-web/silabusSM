<template>
  <div class="q-pa-md">
    <div class="q-col-gutter-md row items-start">
      <div class="col-6" v-for="item in horarios" :key="item.uid">
        <RouterLink
          :to="{
            path: `/tableros/${item.uid}`,
            params: { row: item.uid },
          }"
        >
          <ItemHorario :item="item.nombre"/>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "boot/firebase";
import ItemHorario from "../components/ItemHorario.vue";

export default {
  components: { ItemHorario },

  setup() {
    const dialog = ref(false);
    const position = ref("top");
    const horarioseleccionado = ref("");
    const horarios = ref([]);

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
      horarioseleccionado,
      horarios,
      filter: ref(""),
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(rows.length / pagination.value.rowsPerPage)
      ),
      open(pos) {
        position.value = pos;
        dialog.value = true;
      },
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
