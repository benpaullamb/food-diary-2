<template>
  <b-container class="pt-2 pt-sm-4">
    <h1>Add Input</h1>

    <b-form>
      <b-row>
        <b-col sm="6">
          <b-form-group label="Name" label-for="input-name">
            <b-form-input v-model="newInput.name" type="text" id="input-name"></b-form-input>
          </b-form-group>

          <b-form-group label="Time" label-for="input-time">
            <b-form-input v-model="newInput.time" type="time" id="input-time"></b-form-input>
          </b-form-group>

          <b-form-group label="Type" label-for="input-type">
            <b-form-select v-model="newInput.type" :options="inputTypeOptions" id="input-type"></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="6">
          <b-form-group
            v-if="newInput.type === 'stress' || newInput.type === 'exercise'"
            :label="`Intensity: ${newInput.intensity}`"
            label-for="input-intensity"
          >
            <b-form-input
              v-model="newInput.intensity"
              type="range"
              min="0"
              max="10"
              step="1"
              id="input-intensity"
            ></b-form-input>
          </b-form-group>

          <b-form-group v-if="newInput.type === 'food'" label="Ingredients" label-for="input-ingredients">
            <b-form-textarea v-model="newInput.ingredients" id="input-ingredients"></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      newInput: {
        name: '',
        time: '',
        type: 'food|medication|stress|exercise',
        ingredients: '',
        intensity: 0,
      },

      inputTypeOptions: [
        { value: 'food', text: 'Food' },
        { value: 'medication', text: 'Medication' },
        { value: 'stress', text: 'Stress' },
        { value: 'exercise', text: 'Exercise' },
      ],
    };
  },
};
</script>

<style></style>
