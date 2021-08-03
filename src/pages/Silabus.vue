<template>
  <q-table
    class="q-mt-md tablacursos"
    :filter="filter"
    no-data-label="No hay cursos"
    :columns="columns"
    :rows="cursos"
    hide-pagination
    row-key="uid"
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

    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body="props">
    
      <q-tr :props="props" @click="props.expand = !props.expand">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
        <RouterLink 
          :to="{ path: `/cursos/${props.row.uid}`,  params: { row: props.row.uid }  }"
        >Show</RouterLink>
  
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left" to="/home">
            This is expand slot for row above: {{ props.row }}
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <div>
    <div v-for="silabus in cursos " :key="silabus.uid" >
      <span> {{ silabus.nombre }}</span>
      <template>
        <div class="container q-pa-lg">
          <q-pdfviewer
            v-model="show"
            :src="silabus.url"
            type="html5"
            content-class="fit container"
            inner-content-class="fit container"
          />
        </div>
      </template>
    </div>
  </div>

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
import Itemdoc from "../components/Itemdoc";

const columns = [
  {
    name: "silabus",
    label: "silabus",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "pdf",
    label: "pdf",
    align: "left",
    field: "url",
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
  components: {},

  setup() {
    const show = ref(true);
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
      show,
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
.tablacursos {
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
