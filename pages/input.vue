<template>
  <b-container class="pt-2 pt-sm-4">
    <h1>Add Input</h1>

    <b-form>
      <b-row>
        <b-col sm="6" class="mb-5">
          <b-form-group label="Name" label-for="input-name">
            <b-form-input v-model="newInput.name" type="text" id="input-name"></b-form-input>
          </b-form-group>

          <b-form-group label="Time" label-for="input-time">
            <b-form-input v-model="newInput.time" type="time" id="input-time"></b-form-input>
          </b-form-group>

          <b-form-group label="Type" label-for="input-type">
            <b-form-select v-model="newInput.type" :options="inputTypeOptions" id="input-type"></b-form-select>
          </b-form-group>

          <div>
            <b-button @click="cancel" variant="danger">Cancel</b-button>
            <b-button @click="save" variant="success">Save</b-button>
          </div>
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

          <div v-if="newInput.type === 'food'">
            <b-form-group label="Ingredients" label-for="input-ingredients">
              <b-form-textarea v-model="newInput.pastedIngredients" id="input-ingredients" rows="4"></b-form-textarea>
            </b-form-group>

            <div>
              <b-button variant="primary" @click="separateIngredients" class="mb-3">Extract</b-button>
              <b-button variant="secondary" @click="newIngredient" class="mb-3">Add Individual</b-button>
            </div>

            <div v-for="(ingredient, i) in newInput.ingredients" :key="`ingredient-${i}`" class="mb-3 ingredient">
              <b-form-input v-model="newInput.ingredients[i]" type="text"></b-form-input>
              <span @click="deleteIngredient(i)" class="material-icons ml-3 text-dark delete" title="Delete ingredient"
                >delete</span
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </b-container>
</template>

<script>
import AWS from 'aws-sdk';

export default {
  data() {
    return {
      newInput: {
        name: '',
        time: '',
        type: 'food|medication|stress|exercise',
        pastedIngredients: '',
        ingredients: [],
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

  methods: {
    async save() {
      try {
        const lambda = new AWS.Lambda();
        const res = await new Promise((res, rej) => {
          lambda.invoke(
            {
              FunctionName: 'updateDiary',
              Payload: JSON.stringify(this.newInput),
            },
            (err, data) => {
              if (err) {
                return rej(err);
              }
              res(data);
            }
          );
        });
        console.log('Lambda res', res);
      } catch (err) {
        console.warn(err);
      }
      // this.$router.push('/');
    },

    cancel() {
      this.$router.go(-1);
    },

    separateIngredients() {
      const chars = this.newInput.pastedIngredients.replace(/\s*\(?\d+%\)?/gi, '').split('');
      let bracketLevel = 0;
      let curIngredient = '';

      chars.forEach((char) => {
        if (char === ',' && bracketLevel === 0) {
          const ingredient = curIngredient.trim();
          this.newInput.ingredients.push(ingredient);
          curIngredient = '';
          return;
        }

        if (char === '(') {
          bracketLevel++;
        } else if (char === ')') {
          bracketLevel--;
        }

        curIngredient += char;
      });
    },

    deleteIngredient(index) {
      this.newInput.ingredients.splice(index, 1);
    },

    newIngredient() {
      this.newInput.ingredients.push('');
    },
  },
};
</script>

<style lang="scss">
.ingredient {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;

  .delete:hover {
    cursor: pointer;
  }
}
</style>
