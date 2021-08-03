<template>
  <q-table
    class="q-mt-md tablaUsuarios"
    :filter="filter"
    no-data-label="No hay usuarios"
    :columns="columns"
    :rows="usuarios" 
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
                <Itemus :props="props.row" class="ContainerItemUsuario"/>
            </div>
        </div>
      </div>

      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">
            <Itemus :props="props.row" style="background: blue" />
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>

</template>

<script>
import { ref, computed } from "vue";
import { db } from "boot/firebase";
import Itemus from '../components/Itemus';

const columns = [
  {
    name: "nombre",
    label: "Nombre",
    align: "left",
    field: "nombre",
    sortable: true,
  },
  {
    name: "correo",
    label: "Correo",
    align: "left",
    field: "email",
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
  components: { Itemus },
  setup() {
    const usuarioSeleccionado = ref("mails");
    const users = ref([]);
    const usuarios = ref([]);
    const selected = ref("");

    db.collection("usuarios")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          usuarios.value = [...usuarios.value, doc.data()];
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
      usuarioSeleccionado,
      users,
      usuarios,
      filter: ref(""),
      columns,
      rows,
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(rows.length / pagination.value.rowsPerPage)
      ),
    };
  },
};
</script>

<style>
.tablaUsuarios {
  border: none;
  background: white;
  box-shadow: none;
}
.ContainerItemUsuario {
    margin: auto; 
    width:95%; 
    padding: 8px;
    border-bottom: solid 0.1px #00000015  
}
</style>