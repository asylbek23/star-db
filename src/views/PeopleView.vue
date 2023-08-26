<template>
  <div class="home">
    <div class="container">
      <h1>People</h1>

      <div class="content">
        <!-- Content names -->
        <aside class="content__names">
          <div
            v-for="(people, index) in peoples"
            :key="people.created"
            @click="getDetail(people, index)"
            class="content__name">
            {{ people.name }}
          </div>
          <vue-simple-spinner
            v-if="peoples.length === 0"
            size="64"
            speed="1"
            spacing="4"
            line-size="9"
            line-bg-color="#555"></vue-simple-spinner>
        </aside>

        <!-- Content block -->
        <section>
          <div class="content__block">
            <img v-if="_imgURL" :src="_imgURL" :alt="peopleInfo.name" width="300" height="400" />
            <div v-if="_imgURL" class="content__info">
              <p>
                Name: <span>{{ peopleInfo.name }}</span>
              </p>
              <p>
                Genger: <span>{{ peopleInfo.gender }}</span>
              </p>
              <p>
                Birth Year: <span>{{ peopleInfo.birth_year }}</span>
              </p>
              <p>
                Height: <span>{{ peopleInfo.height }}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue"
  import axios from "@/plugins/axios"
  import VueSimpleSpinner from "@/components/Spinner/Spinner.vue"

  let id = ref(0)
  const _imgURL = ref("")

  const peoples = ref([])
  const peopleInfo = ref([])

  const getDetail = (people, index) => {
    id.value = index + 1
    _imgURL.value = `https://starwars-visualguide.com/assets/img/characters/${id.value}.jpg`
    peopleInfo.value = people
  }

  const getNames = async () => {
    id.value = Math.floor(Math.random() * 10)

    await axios
      .get("/people")
      .then((data) => {
        peoples.value = data.data.results
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getNames()
</script>
