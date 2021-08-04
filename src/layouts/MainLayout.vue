<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1" >
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58" >
      <q-toolbar >
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

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
          <q-item v-for="link in links1" :key="link.text" v-ripple clickable :to="link.to" exact @click="tituloHeader = link.text; iconoHeader = link.icon">

            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />


          <q-item v-for="link in links2" :key="link.text" v-ripple clickable :to="link.to" exact @click="tituloHeader = link.text; iconoHeader = link.icon">
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item-label header class="text-weight-bold text-uppercase">
            More from Youtube
          </q-item-label>

          <q-item v-for="link in links3" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" />

          <q-item v-for="link in links4" :key="link.text" v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-lg" />
          
          <q-item v-ripple clickable>
             <q-btn round flat>
            <q-icon name="logout" color="black" size="27px" v-if="isAuthenticated" flat @click="salir" />
          </q-btn>
            <q-item-section>
              <q-item-label>Salir </q-item-label>
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
import { ref, watch } from 'vue'
import { fabYoutube } from '@quasar/extras/fontawesome-v5'
import { useQuasar } from 'quasar'
import firebase from "firebase";
import { useAuth } from "@vueuse/firebase/useAuth";
import { auth, db } from "boot/firebase";

export default {
  name: 'MyLayout',
  setup () {
    const iconoHeader = ('home')
    const tituloHeader = ref('Silabus SM')
    const leftDrawerOpen = ref(false)
    const search = ref('')
    const $r = useQuasar()
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
      links1: [
        { icon: 'home', text: 'Home', to:'/' },
        { icon: 'whatshot', text: 'Silabus', to:"/silabus"  },
        { icon: 'subscriptions',  text: 'Usuarios',to:"/usuarios" }
      ],
      links2: [
        { icon: 'folder', text: 'Docentes', to:"/docentes" },
        { icon: 'restore', text: 'Cursos', to:"/cursos"  },
        { icon: 'watch_later', text: 'Horarios', to:"/horarios" },
        { icon: 'thumb_up_alt', text: 'Tablero', to:"/tableros" }
      ],
      links3: [
        { icon: fabYoutube, text: 'YouTube Premium' },
        { icon: 'local_movies', text: 'Movies & Shows' },
        { icon: 'videogame_asset', text: 'Gaming' },
        { icon: 'live_tv', text: 'Live' }
      ],
      links4: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'flag', text: 'Report history' },
        { icon: 'help', text: 'Help' },
        { icon: 'feedback', text: 'Send feedback' }
      ],
    }
  }
}
</script>

<style lang="sass">
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 400
    font-size: .75rem
    &:hover
      color: #000
</style>
