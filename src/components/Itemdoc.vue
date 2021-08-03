<template>
  <div style="display: flex">
    <div class="">
      <q-avatar style="width:30px; height:30px;">
        <img :src="props.foto" >
      </q-avatar>
    </div>
    <div style="margin-left:10px">
      <div style="font-size:0.8rem;">{{ props.nombres }} {{props.apellidos}}</div>
      <div style="font-size:0.6rem;"> {{ props.celular }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["props"],

  setup() {
    const name = ref("hello");
    const coloriTem = ref (["primary","blue","purple","brown","green","grey","pink","orange","red"]);
    return {
      name,coloriTem
    };
  },
};
</script>

<style>
.nombreDoc {
  margin-left: -10px;
  background: black;
  color: white;
}
</style>