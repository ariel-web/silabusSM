<template>
  <q-table
    class="q-mt-md tablaSilabus"
    :filter="filter"
    no-data-label="No hay usuarios"
    :columns="columns"
    :rows="cursos" 
    hide-pagination
    row-key="uid"
    hide-header
    hide-bottom
    v-model:pagination="pagination"
  >
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>

    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="600"
        v-model="filter"
        placeholder="Buscar"
        style="
          background: #f3f3f3;
          padding-left: 15px;
          padding-right: 10px;
          border-radius: 40px;
        "
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body="props">
      <div
        flat
        @click="props.expand = !props.expand"
        style="width: 100%;"
      >
        <div class="card" :props="props" width="100%" >
           <div>
                <ItemSil :props="props.row" class="ContainerItemUsuario"/>
            </div>
        </div>
      </div>
    </template>
  </q-table>

  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
    @click="open('right')"
  >
    <q-btn fab icon="add" color="accent" to="/silabus/agregar" />
  </q-page-sticky>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "boot/firebase";
import ItemSil from 'components/ItemSil.vue'

const columns = [
  {
    name: "silabus",
    label: "Curso",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "docente",
    label: "docente",
    align: "left",
    field: "docenteNombre",
    sortable: true,
  },
];

const rows = [
  {
    nombre: "productp 1",
    correo: "opcion1",
  },
];

export default {
  components: {ItemSil},
  setup() {
    const show = ref(true);
    const src = ref("pdf/pdf-test.pdf");
    const dialog = ref(false);
    const position = ref("top");
    const cursoseleccionado = ref("mails");
    const cursos = ref([]);

    db.collection("silabus")
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

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 1000,
      // rowsNumber: xx if getting data from a server
    });
    return {
      cursoseleccionado,
      cursos,
      filter: ref(""),
      dialog,
      position,
      columns,
      rows,
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
.tablaSilabus {
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
