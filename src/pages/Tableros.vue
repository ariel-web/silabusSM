<template>
  <div class="text-center flex-center" style="background: #f1f1f1">
    <div class="" style="display: none">
      {{ (ide = $route.params.id.toString()) }}
    </div>
    <div style="display: flex; text-align: center; background: #f1f1f1">
      <div v-for="(dia, index) in dias" :key="index" style="border: none">
        <div
          style="
            width: 210px;
            height: 40px;
            background: #d2d2d2;
            margin-top: 10px;
            margin-left: 10px;
            border-radius: 5px;
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <div style="margin-top: 10p">
            {{ dia }}
          </div>
        </div>
      </div>
    </div>
    <template v-for="(n, index) in 6" :key="index" style="">
      <div style="display: flex">
        <div
          v-for="(m, index) in 5"
          :key="index"
          style="width: 220px; border: none; padding-left: 10px"
        >
          <td>
            <span style="display: none">{{ (enviado = false) }}</span>
            <div class="" v-for="item in tableros" :key="item.uid">
              <div v-if="item.columna === m && item.fila == n">
                <TableroInput :title="item" :colum="n" :fila="m" :iden="ide" />
                <span style="display: none">{{ (enviado = true) }}</span>
              </div>
            </div>
          </td>
          <td>
            <div v-if="enviado === false">
              <TableroInput :title="null" :colum="n" :fila="m" :iden="ide" />
            </div>
          </td>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";
import TableroInput from "../components/TableroInput.vue";
import { db } from "boot/firebase";
export default {
  components: { TableroInput },
  setup() {
    const lista1 = ref([1, 2, 3, 4, 5, 6]);
    const ide = ref("");
    const hola = ref("");
    const enviado = ref(false);
    const update = ref(false);
    const dias = ref([
      "LUNES",
      "MARTES",
      "MIERCOLES",
      "JUEVES",
      "VIERNES",
    ]);
    const tableros = ref([]);
   
    db.collection("tableros")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tableros.value = [...tableros.value, doc.data()];
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    
    
    return {
      lista1,
      dias,
      ide,
      hola,
      tableros,
      enviado,
    };
  },
};
</script>
