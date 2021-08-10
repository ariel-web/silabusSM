<template>
  <p style="margin-left: 10px; margin-top:10px; margin-bottom:10px;font-size: 18px; font-weight: 500">Grados</p>
  <div style="display:flex; overflow-y:hidden;" >
    <div v-for="(grado, index) in grados" :key="index" style="display:flex; ">
      <div>
        <q-badge rounded color="grey-3" :label="grado" style="color:black; margin:4px; padding:10px; padding-left:15px; padding-right:15px;" /> 
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const tab = ref("movies");
    const usuarioSeleccionado = ref("mails");
    const grados = [
      "1ER GRADO",
      "2DO GRADO",
      "3ER GRADO",
      "4TO GRADO",
      "5TO GRADO",
      "6TO GRADO",
      "1RO AÑO",
      "2DO AÑO",
      "3RO AÑO",
      "4TO AÑO",
      "5TO AÑO",
    ];

    return {
      tab,
      usuarioSeleccionado,
      grados,
    };
  },
};
</script>
<style scoped>
::-webkit-scrollbar {
    display: none;
}
</style>