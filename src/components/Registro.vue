<template>
  <div class="q-px-xl">
    <h6>Formulario de {{ acceder ? "Login" : "Registro" }}</h6>
    <pre>{{isAuthenticated}}</pre>
    <pre>{{user}}</pre>

    <q-form class="q-glutter-md" @submit.prevent="ProcesarForulario">
      <q-input label="nombre" v-model="nombre" />
      <q-input label="Correo" v-model="email" />
      <q-input label="Contraseña" v-model="contra" />
      <q-input label="Confirmar Contraseña" v-if="!acceder" v-model="contra2" />
      <q-btn
        :label="acceder ? 'Login' : 'Registro'"
        type="submit"
        color="primary"
        class="q-mt-xl"
      />
      <q-btn
        color="primary"
        outline
        v-if="!acceder"
        @click="acceder = true"
        label="¿Ya tienes cuenta?"
        class="q-mt-xl"
      />
      <q-btn
        color="negative"
        outline
        v-else
        @click="acceder = false"
        label="¿No tienes cuenta?"
        class="q-mt-xl"
      />
    </q-form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "boot/firebase";
import firebase from 'firebase'
import { useAuth } from '@vueuse/firebase/useAuth'

export default {
  setup() {
    const email = ref("prueba@prueba.com");
    const nombre = ref('')
    const contra = ref("123123");
    const contra2 = ref("");
    const acceder = ref(true);

    const { isAuthenticated, user } = useAuth(firebase.auth)
 
    const ProcesarForulario = async () => {
      if (!email.value.trim() || !contra.value.trim()) {
        console.log("CAMPOS VACIOS");
        return;
      }
      try {
          
        
        if (!acceder.value & (contra.value === contra2.value)) {
            //**** **REGISTRAR** ****//
            console.log("Es: verdadero");
            const usuario = await auth.createUserWithEmailAndPassword(
            email.value,
            contra.value
          );
          //LLENARA DATOS A LA USUARIOS
          await db.collection('usuarios').doc(usuario.user.uid).set({
              email: usuario.user.email,
              estado: true,
              uid: usuario.user.uid
          });
          console.log(usuario.user);
        } else {
            //**** **INGRESAR** ****//  
            const usuario = await auth.signInWithEmailAndPassword(
            email.value,
            contra.value
          );
          //ACTUALIZAR ESTADO
          await db.collection('usuarios').doc(usuario.user.uid).update({
              estado: true,
          });
          console.log(usuario.user);
        }

        email.value = "";
        contra.value = "";
        contra2.value = "";
      
      } catch (error) {
        console.log( error );
      }
    };
    return {
      email,
      nombre,
      contra,
      contra2,
      acceder,
      ProcesarForulario,
      isAuthenticated,
      user
    };
  },
};
</script>

