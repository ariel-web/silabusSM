<template>
  <div class="fullscreen flex flex-top">
    <div class="headerDetail" v-for="c in curso" :key="c.uid">
      <img
        src="imagenes/app/topDetailCurso.png"
        style="position: absolute; z-index: 0; width: 100%; height: 200px"
      />
      <div 
        style="
          position: absolute;
          width: 100%;
          height: 200px;
          z-index: 1;
          margin-top: 20px;
        "
      >
        <div class="nombreDetailCurso" style="padding-left: 15px; color: white">
           <h5>{{ c.curso }}</h5>
        </div>
        <div
          class="gradoSeccion"
          style="
            display: flex;
            position: absolute;
            justify-content: center;
            align-items: center;
            bottom: 0px;
            right: 20px;
          "
        >
          <div
            class="detailGrado"
            style="
              color: white;
              width: 50px;
              height: 30px;
              margin-right: -10px;
              font-size: 16px;
              font-weight: 500;
            "
          >
            {{ c.grado }}
          </div>
          <div
            class="detailSeccion"
            style="
              width: 82px;
              height: 80px;
              border-radius: 50%;
              border: solid 6px #f3f3f3;
            "
          >
            <q-avatar
              color="red"
              text-color="white"
              style="width: 70px; height: 70px"
              >{{ c.seccion.charAt(0).toUpperCase() }}</q-avatar
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="cont === 0" style="display:none;">{{ getDocente($route.params.id.toString()) }}{{cont = 1 }} </div>

    <div class="botomDetail">
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { db } from "boot/firebase";

export default {
  props: ["row"],
  setup() {
    const cont = 0;
    const ide = ref("");
    return {
      ide,
      cont
    };

  },
    
  data() {
  
    return {  
      curso:[] }

  },
  methods: {

    getDocente(id)  {
      db.collection("cursos")
        .where("uid", "==", id.toString())
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            this.curso = [...this.curso, doc.data()];
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
  },
};
</script>

<style>
.headerDetail {
  align-self: top;
  width: 100%;
  height: 200px;
}

.botomDetail {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #800080a4;
  border-radius: 0 10 40% 60%/25%;
}
</style>
