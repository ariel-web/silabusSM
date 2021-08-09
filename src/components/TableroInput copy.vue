<template>
  <div class="" style="width: 190px">
  <div v-if="title !== null">
    <span style="display:none;">{{titulo = title.titulo}}</span>
    <span>{{title.columna}}, {{title.fila}}</span>
  </div>

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
        style="width: 190px; padding-bottom: 10px"
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps">

            <q-item-section>
              {{ scope.opt.cursoNombre }}
              <span style="font-size:0.7rem;">{{scope.opt.docenteGrado}} {{scope.opt.docenteSeccion}}</span>
            </q-item-section>
            
          </q-item>
        </template>
  </q-select>
  {{sil}}
 
  <div v-if="titulo !== ''">
    <span style="display:none;">{{silabus = titulo}}</span>
  </div>
  <q-input style="margin-left:10px; margin-right:10px; "
    bottom-slots
    @focus="mostrar = true"
    @blur="mostrar = false"
    :placeholder="titulo"
    v-model="silabus"    
  >
    <template v-slot:append>
      <q-btn
        type="input"
        v-if="mostrar === true"
        round
        dense
        flat
        icon="check"
        @click="ProcesarFormularioTablero(colum, fila, iden)"
      />
    </template>
  </q-input>
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
    const titulo = ref("")
    const silabus = ref(null);
    const mostrar = ref(false);
    const sil = ref(null)
    const Values = ref(JSON.parse(localStorage.getItem('silabos')));
   

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

        nombre.value = "";
        grado.value = "";
      } catch (error) {
        console.log(error);
      }
    };

    return {
      mostrar,
      silabus,
      titulo,
      ProcesarFormularioTablero,
      Values,
      sil
    };
  },
};
</script>
