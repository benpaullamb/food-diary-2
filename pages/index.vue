<template>
  <b-container class="pt-2 pt-sm-4">
    <h1>{{ today }}</h1>
    <h2 class="h5">Food Diary Entry</h2>

    <div>
      <h3 class="h2">Inputs</h3>

      <b-button @click="$router.push('/input')" variant="primary">Add</b-button>
    </div>

    <div>
      <h3 class="h2">Outputs</h3>
    </div>
  </b-container>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  data() {
    return {
      entry: {
        inputs: [],
        outputs: {
          symptoms: {
            nausea: 0,
            diarrhea: 0,
            stomachPain: 0,
            bloating: 0,
            gas: 0,
            constipation: 0,
          },
          bowelMovements: [],
          sleep: {
            start: '',
            end: '',
            duration: 0,
          },
        },
      },
    };
  },

  computed: {
    today() {
      return DateTime.now().toFormat('EEEE, dd MMMM');
    },
  },
};
</script>

<style></style>
