<template>
  <div class="col-12">
    <q-card class="my-card" >
      <q-img :src="item.imagen" style="height:100px;">
        <div
          class="absolute-bottom text-left"
          style="font-size: 16px; padding: 5px"
        >
          {{ item.nombre }}
        </div>
      </q-img>
    </q-card>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style></style>
