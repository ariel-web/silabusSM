<template>
  <div style="display: flex; align-items:center; margin-left: 0px;" >
    <div class="">
      <q-avatar  style="width:35px; height:35px;">
        <q-avatar style="margin-top:-5px;">
          <q-icon name="description"  :color="coloriTem[Math.floor(Math.random() * 9)]" />
        </q-avatar>
      </q-avatar>
    </div>
    <div style="margin-left: 10px; width:130px;" >
      <div style="font-size: .9rem">{{ props.cursoNombre }}</div>
      <div style="font-size: 0.7rem">{{ props.docenteGrado }} {{props.docenteSeccion.charAt(0).toUpperCase() }}</div>
    </div>
    <div style="margin-left: 10px; width:130px;" >
        <div style="font-size: .9rem">{{ props.docenteNombre }}</div>
    </div>
    <div >
        <a :href="props.url" style="text-decoration:none; width:50px; height:800px;" frameborder="0" allowfullscreen>ver</a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["props"],

  setup() {
    const name = ref("hello");
    const coloriTem = ref([
      "primary",
      "blue",
      "purple",
      "brown",
      "green",
      "grey",
      "pink",
      "orange",
      "red",
    ]);
    return {
      name,
      coloriTem,
    };
  },
};
</script>

<style>
</style>
