<template>
  <div class="" style="width: 210px; position: relative">
    <div
      style="
        position: absolute;
        height: 20px;
        widht: 30px;
        right: 0;
        z-index: 10;
      "
      v-if="titulo === '' ? (iconex = 'add') : (iconex = 'edit')"
    >
    {{ IDEE }}
      <q-btn size="12px" round flat :icon="iconex" @click="prompt = true" />
    </div>
    <div v-if="title !== null">
      <span style="display: none">{{ (titulo = title.titulo) }}</span>
      <span style="display: none">{{ (grad = title.grado) }}</span>
      <span style="display: none">{{ (secc = title.seccion) }}</span>
      <span style="display: none">{{ (urlSil = title.url) }}</span>
      <span style="display: none">{{ (docName = title.docente) }}</span>
      <span style="display: none">{{ (docFoto = title.foto) }}</span>
      <span style="display: none">{{ (ideTab = title.uid) }}</span>
    </div>
    <div
      class="cardd"
      style="padding: 10px; margin-top: 10px; position: relative"
    >
  
      <div style="backgroud: blue; height: 16px; text-align: left">
        <span style="font-size: 15px; font-weight: 500">{{
          titulo.toUpperCase()
        }}</span>
      </div>
      <div v-if="titulo !== ''" style="display: flex; height: 35px">
        <div style="">
          <span style="font-size: 0.7rem; font-weight: 500">{{ grad }}</span>
        </div>
        <div>
          <span
            style="font-size: 0.7rem; font-weight: 500; padding-left: 5px"
            >{{ secc }}</span
          >
        </div>
      </div>

      <div
        v-if="titulo !== ''"
        style="
          margin-top: 0px;
          display: flex;
          position: relative;
          align-content: center;
        "
      >
        <div>
          <a :href="urlSil">
            <button
              style="
                padding: 4px;
                background: #f1f1f1;
                border: none;
                border-radius: 8px;
                margin-top: 5px;
              "
            >
              silabus
            </button>
          </a>
        </div>
        <div style="position: absolute; right: 0px; display: flex">
          <span
            style="font-size: 0.84rem; margin-top: 7px; margin-right: 5px"
            >{{ docName }}</span
          >
          <img width="30" height="30" style="border-radius:50%;" :src="docFoto" />
        </div>
      </div>
    </div>

    <div v-if="titulo !== ''">
      <span style="display: none">{{ (silabus = titulo) }}</span>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section class="row items-center q-pb-none" v-if="iconex === 'edit'" >
          <div class="text-h6">Editar</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pb-none" v-if="iconex === 'add'" >
          <div class="text-h6">Nuevo</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section class="q-pt-none" style="margin-top:20px;">
          <q-select
            filled
            v-model="sil"
            option-value="uid"
            option-label="cursoNombre"
            map-options
            :options="Values"
            label="Seleccionar Curso"
            color="primary"
            options-selected-class="text-deep-orange"
            style="width: 100%; padding-bottom: 10px"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  {{ scope.opt.cursoNombre }}
                  <span style="font-size: 0.7rem"
                    >{{ scope.opt.docenteGrado }}
                    {{ scope.opt.docenteSeccion }}</span
                  >
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Eliminar" v-if="iconex === 'edit'" style="color:red;" @click="EliminarItemTab" v-close-popup />
          <q-btn v-if="iconex === 'add'"
            flat
            label="Guardar"
            @click="ProcesarFormularioTab(colum, fila, iden)"
            v-close-popup
          />
          <q-btn v-if="iconex === 'edit'"
            flat
            label="Guardar"
            @click="ProcesarFormularioTabEdit(colum, fila, iden)"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "boot/firebase";
export default {
  props: {
    title: null,
    colum: Number,
    fila: Number,
    iden: String,
  },
  setup() {
    const titulo = ref("");
    const silabus = ref(null);
    const mostrar = ref(false);
    const sil = ref(null);
    const Values = ref(JSON.parse(localStorage.getItem("silabos")));
    const prompt = ref(false);
    const address = ref("");
    const iconex = ref("add");
    const grad = ref("");
    const secc = ref("");
    const urlSil = ref("");
    const docName = ref("");
    const docFoto = ref("");
    const ideTab = ref("");
    const IDEE = ref("");
    const ProcesarFormularioTablero = async (col, fil, ident) => {
      try {
        await db
          .collection("tableros")
          .add({
            titulo: silabus.value,
            fila: col,
            columna: fil,
            iden: ident,
          })
          .then((docRef) => {
            db.collection("tableros").doc(docRef.id).update({
              uid: docRef.id,
            });
            console.log("Agregado!!");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    const ProcesarFormularioTab = async (col, fil, ident) => {
      try {
        await db
          .collection("tableros")
          .add({
            titulo: sil.value.cursoNombre,
            seccion: sil.value.docenteSeccion,
            grado: sil.value.docenteGrado,
            docente: sil.value.docenteNombre,
            foto: sil.value.docenteFoto,
            url: sil.value.url,
            fila: col,
            columna: fil,
            iden: ident,
          })
          .then((docRef) => {
            db.collection("tableros").doc(docRef.id).update({
              uid: docRef.id
            });
            ideTab.value = docRef.id;
            console.log("Agregado!!");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } catch (error) {
        console.log(error);
      }
      titulo.value = sil.value.cursoNombre; 
      grad.value =  sil.value.docenteGrado;
      secc.value = sil.value.docenteSeccion;
      urlSil.value = sil.value.url;
      docName.value = sil.value.docenteNombre;
      docFoto.value = sil.value.docenteFoto;
      
    };
    const ProcesarFormularioTabEdit = async (col, fil, ident) => {
      try {
        await db
          .collection("tableros").doc(ideTab.value).update({
            titulo: sil.value.cursoNombre,
            seccion: sil.value.docenteSeccion,
            grado: sil.value.docenteGrado,
            docente: sil.value.docenteNombre,
            foto: sil.value.docenteFoto,
            url: sil.value.url,
            fila: col,
            columna: fil,
            iden: ident,
          })
      } catch (error) {
        console.log(error);
      }
      titulo.value = sil.value.cursoNombre; 
      grad.value =  sil.value.docenteGrado;
      secc.value = sil.value.docenteSeccion;
      urlSil.value = sil.value.url;
      docName.value = sil.value.docenteNombre;
      docFoto.value = sil.value.docenteFoto;
      ideTab.value = ideTab.value;
    };
    const EliminarItemTab = async () => {
      try {
        db.collection("tableros").doc(ideTab.value).delete().then(() => {
          console.log("Document successfully deleted!");
        })
      } catch (error) {
        console.log(error);
      }
      titulo.value = ''; 
    };
    return {
      mostrar,
      silabus,
      titulo,
      ProcesarFormularioTablero,
      ProcesarFormularioTab,
      ProcesarFormularioTabEdit,
      EliminarItemTab,
      Values,
      sil,
      prompt,
      address,
      iconex,
      grad,
      secc,
      urlSil,
      docName,
      docFoto,
      ideTab,
      IDEE
    };
  },
};
</script>
<style scoped>
.cardd {
  height: 100px;
  background: #fffbe5;
  border-radius: 5px;
}
</style>