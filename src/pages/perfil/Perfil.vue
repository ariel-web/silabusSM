<template>
  <div class=" text-center" style="width: 100%">
    <div class="headerperfil" style="display:none;">
      <div style="background: white; position: absolute; left: 0px">
        <q-btn flat>
          <q-icon
            name="arrow_back"
            class="text-black"
            style="font-size: 2rem"
          />
        </q-btn>
      </div>

      <div style="background: white; position: absolute; right: 0px">
        <q-btn flat>
          <q-icon name="more_vert" class="text-black" style="font-size: 2rem" />
        </q-btn>
      </div>
    </div>

    <div class="imagenPerfil" style="margin-top:30px;">
      <div>
        <img src="https://image.flaticon.com/icons/png/512/1089/1089129.png" width="170" height="170" alt="">    
      </div>
    </div>

    <div class="nombrePerfil" style="margin-top:10px" v-if="usuario !== null">
      <div class="nombrePerfil" style="font-size:1.6rem; font-weight:600; text-transform: capitalize;" >
        {{ usuario.nombre }}
      </div>
      <div class="correoPerfil" style="font-size:1rem; font-weight:600; text-transform: capitalize;" >
        {{ usuario.email }}
      </div>
    </div>

  </div>
</template>

<script>
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { ref } from "vue";
import { db } from "boot/firebase";

export default {
  name: "Perfil",

  setup() {
    const { isAuthenticated, user } = useAuth(firebase.auth);
    const usuario = ref(null);

    db.collection("usuarios")
      .doc(user.value.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          usuario.value = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    return {
      isAuthenticated,
      user,
      usuario
    };
  },

  data() {
    return {
      showForm: true
    }
  },
  mounted() {
     if (this.showForm) window.scrollTo(0, 0) // only demo value - use 40
  }
};
</script>

<style>
.headerperfil {
  width: 100%;
  height: 50px;
  background: white;
  display: flex;
  position: relative;
  align-items: center;
}
</style>
