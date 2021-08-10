<template>
  <p style="margin-left:10px; font-size:18px; font-weight:500;" > Docentes</p>
    <q-tabs v-model="usuarioSeleccionado" style="margin-left:-10px;" >
      <q-tab
        v-for="docente in docentes"
        :key="docente.uid"
        :name="docente.nombres"
      >
    <q-avatar style="width:100px; height:100px; background:#a3a3a343;">
      <img :src="docente.foto" style="width:60px; height:60px; border-radius:50%;" >
    </q-avatar>
        <q-label>
        {{docente.nombres}}
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
    const docentes = ref([]);

    db.collection("docentes").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario Nuevo: ", change.doc.data());
          docentes.value = [...docentes.value, change.doc.data()];
        }
        if (change.type === "modified") {
          console.log("Se Modifico el usuario: ", change.doc.data());
          docentes.value = docentes.value.map((docente) =>
            docente.uid === change.doc.data().uid
              ? { ...docentes, estado: change.doc.data().estado }
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
      docentes,
    };
  },
};
</script>

