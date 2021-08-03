<template>
<q-div>
  <div>
    <tr>
      <td></td>
      <td><h6>HELLO</h6></td>
      <td>{{ props.nombre }}</td>
      <td>{{ props.email }}</td>
    </tr>
  </div>
</q-div>

<q-item>
    <q-item-section avatar>
    <q-avatar>
        <q-avatar color="primary" text-color="white">J</q-avatar>
    </q-avatar>
    </q-item-section>

    <q-item-section>
    <q-item-label lines="1">
        {{ props.nombre }}
    </q-item-label>
    </q-item-section>

    <q-item-section side>
    <q-item-label caption>
        {{ props.nombre }}
    </q-item-label>
    <q-icon name="keyboard_arrow_down" />
    </q-item-section>
</q-item>
</template>

<script>
import { ref } from "vue";
export default {
  props: ["props"],
  setup() {
    const name = ref("hello");
    return {
      name,
    };
  },
};

</script>

