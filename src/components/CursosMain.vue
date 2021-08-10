<template>
  <p style="margin-left:10px; font-size:18px; font-weight:500;" >cursos</p>
    <q-tabs v-model="usuarioSeleccionado" style="margin-left:-10px;" >
      <q-tab
        v-for="curso in cursos"
        :key="curso.uid"
        :name="curso.curso"
      >
    <q-avatar rounded style="width:100px; height:100px; background:#a3a3a343;">
      <img :src="curso.url" style="width:100px; height:100px;">
    </q-avatar>
        <q-label>
        {{curso.curso}}
    </q-label>
      </q-tab>
    </q-tabs>
</template>

<script>

import { ref } from "vue";
import { db } from "boot/firebase";

export default {
  setup() {
    const tab = ref("movies");
    const usuarioSeleccionado = ref("mails");
    const cursos = ref([]); 

    db.collection("cursos").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario Nuevo: ", change.doc.data());
          cursos.value = [...cursos.value, change.doc.data()];
        }
        if (change.type === "modified") {
          console.log("Se Modifico el usuario: ", change.doc.data());
          cursos.value = cursos.value.map((curso) =>
            curso.uid === change.doc.data().uid
              ? { ...cursos, estado: change.doc.data().estado }
              : user
          );
        }
        if (change.type === "removed") {
          console.log("Se eliminó el usuario: ", change.doc.data());
        }
      });
    });
    return {
      tab,
      usuarioSeleccionado,
      cursos,
    };
  },
};
</script>

