<template>
  <q-layout view="hHh lpR fFf" class="bg-white" >
    <q-header elevated class="bg-white text-grey-7 q-py-xs" height-hint="58" >
      <q-toolbar >
        <div>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />
        </div>
        <q-btn flat no-caps no-wrap class="q-ml-xs">
          <q-icon :name="iconoHeader" color="brown" size="28px" />
          <q-toolbar-title shrink class="text-weight-bold" >
            {{ tituloHeader }}
          </q-toolbar-title>
        </q-btn>
        <q-space />
        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-8" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>

          <q-btn round flat>
            <q-icon name="search" color="black" size="27px"/>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section side>
              <q-avatar size="50px">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label style="font-size:1.0rem; font-weight:bold;">Ariel Luque</q-item-label>
              <q-item-label caption>jhonar_theking@gmail.com</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator class="q-my-md" />
          <q-item v-for="item in links1" :key="item.text" v-ripple clickable :to="item.to" exact @click="tituloHeader = item.text, link = item.text ; iconoHeader = item.icon" class="itemmenu" :active="link === item.text" active-class="my-menu-link" >

            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />


          <q-item v-for="item in links2" :key="item.text" v-ripple clickable :to="item.to" exact @click="tituloHeader = item.text, link = item.text ; iconoHeader = item.icon" class="itemmenu" :active="link === item.text" active-class="my-menu-link" >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item v-for="item in links4" :key="item.text" class="itemmenu" :to="item.to" v-ripple clickable :active="link === item.text" @click="link = item.text" active-class="my-menu-link"  >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable @click="salir">
          <q-item-section avatar v-if="isAuthenticated">
              <q-icon name="logout" />
            </q-item-section>
            <q-item-section>
              <q-item-label>salir</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { auth, db } from "boot/firebase";

export default {
  name: 'MyLayout',
  setup () {
    const iconoHeader = ('home')
    const tituloHeader = ref('Home')
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const link = ref('Home')

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const { isAuthenticated, user } = useAuth(firebase.auth);
    const salir = async () => {
      try {
        //ACTUALIZANDO ESTADO
        await db.collection("usuarios").doc(user.value.uid).update({
          estado: false,
        });
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }

    };

    return {
      iconoHeader,
      tituloHeader,
      isAuthenticated,
      user,
      salir,
      leftDrawerOpen,
      search,
      toggleLeftDrawer,
      link,
      links1: [
        { icon: 'home', text: 'Home', to:'/' },
        { icon: 'whatshot', text: 'Silabus', to:"/silabus"  },
        { icon: 'subscriptions',  text: 'Usuarios',to:"/usuarios" }
      ],
      links2: [
        { icon: 'folder', text: 'Docentes', to:"/docentes" },
        { icon: 'restore', text: 'Cursos', to:"/cursos"  },
        { icon: 'watch_later', text: 'Horarios', to:"/horarios" },
      ],
      links4: [
        { icon: 'group', text: 'About', to:"/about" },
        { icon: 'help', text: 'Ayuda', to:"/ayuda" },
      ],
    }
  }
}
</script>

<style scoped>
.itemmenu{
  color:#7c7c7c;
}

.my-menu-link{
  color: brown;
  background: #ffbb003e;
  border-radius: 8px;
}
</style>
