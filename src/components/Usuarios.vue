<template>
  <q-page-sticky position="bottom" expand>
    <q-tabs v-model="tab" class="text-brown">
      <q-tab name="mails" icon="mail" label="Mails" />
      <q-tab name="Lista" icon="lock" label="Mails" />
      <q-tab name="Lista" icon="lock" label="Mails" />
      <q-tab name="alarms" icon="alarm" label="Alarms" />
      <q-tab name="movies" icon="movie" label="Movies" />
    </q-tabs>
  </q-page-sticky>

  <q-page-sticky position="top" expand>
    <q-tabs v-model="usuarioSeleccionado" class="text-brown">
      <q-tab
        v-for="user in users"
        :key="user.uid"
        :name="user.uid"
        icon="acount_circle"
        :label="user.nombre"
        :class="user.estado? 'text-green':'text-gray' "
      />
    </q-tabs>
  </q-page-sticky>
</template>

<script>
import { ref } from "vue";
import { db } from "boot/firebase";

export default {
  setup() {
    const tab = ref("movies");
    const usuarioSeleccionado = ref("mails");
    const users = ref([]);

    db.collection("usuarios").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("Usuario Nuevo: ", change.doc.data());
          users.value = [...users.value, change.doc.data()];
        }
        if (change.type === "modified") {
          console.log("Se Modifico el usuario: ", change.doc.data());
          users.value = users.value.map((user) =>
            user.uid === change.doc.data().uid
              ? { ...users, estado: change.doc.data().estado }
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
      users,
    };
  },
};
</script>

