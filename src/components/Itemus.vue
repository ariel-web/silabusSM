<template>
  <div style="display: flex">
    <div class="">
      <q-avatar  style="width:38px; height:38px;">
        <q-avatar style="margin-top:-5px;"
          :color="coloriTem[Math.floor(Math.random() * 9)]"
          text-color="white"
          >{{ props.nombre.charAt(0).toUpperCase() }}</q-avatar>
      </q-avatar>
    </div>
    <div style="margin-left: 10px">
      <div style="font-size: 0.94rem">{{ props.nombre }}</div>
      <div style="font-size: 0.7rem">{{ props.email }}</div>
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
.nombreUsu {
  margin-left: -10px;
  background: black;
  color: white;
}
</style>
