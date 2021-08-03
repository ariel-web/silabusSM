<template>
  <q-page padding>
    <Registro v-if="!isAuthenticated" />
    <div v-else>
      <Usuarios />
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { useQuasar } from 'quasar'
import Registro from "../components/Registro.vue";
import Usuarios from "../components/Usuarios.vue";
import { watch } from 'vue'
export default {
  name: "PageIndex",
  components: { Registro, Usuarios },

  setup() {
    const $q = useQuasar()

    watch(() => $q.fullscreen.isActive, val => {
      console.log(val ? 'In fullscreen now' : 'Exited fullscreen')
    })
    const { isAuthenticated, user } = useAuth(firebase.auth);

    return {
      isAuthenticated,
    };
  },
};
</script>
