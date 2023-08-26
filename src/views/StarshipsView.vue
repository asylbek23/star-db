<template>
  <div class="home">
    <div class="container">
      <h1>Starships</h1>

      <div class="content">
        <!-- Content names -->
        <aside class="content__names">
          <div
            v-for="(starship, index) in starships"
            :key="starship.created"
            @click="getDetail(starship, index)"
            class="content__name">
            {{ starship.name }}
          </div>
          <vue-simple-spinner
            v-if="starships.length === 0"
            size="64"
            speed="1"
            spacing="4"
            line-size="9"
            line-bg-color="#555"></vue-simple-spinner>
        </aside>

        <!-- Content block -->
        <section>
          <div class="content__block">
            <img v-if="_imgURL" :src="_imgURL" :alt="starshipInfo.name" width="400" height="300" />
            <div v-if="_imgURL" class="content__info">
              <p>
                Name: <span>{{ starshipInfo.name }}</span>
              </p>
              <p>
                Speed: <span>{{ starshipInfo.max_atmosphering_speed }}</span>
              </p>
              <p>
                Model: <span>{{ starshipInfo.model }}</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from "vue"
  import { getNames } from "@/api/get-names"
  import VueSimpleSpinner from "@/components/Spinner/Spinner.vue"

  let id = ref(0)
  const _imgURL = ref("")

  const starships = ref([])
  const starshipInfo = ref([])

  getNames("/starships", starships)

  const getDetail = (starship, index) => {
    id.value = index + 1
    _imgURL.value = `https://starwars-visualguide.com/assets/img/starships/${id.value}.jpg`
    starshipInfo.value = starship
  }

  watch(starships, (newVal) => {
    localStorage.setItem("starships-names", JSON.stringify(newVal))
  })

  onMounted(() => {
    starships.value = JSON.parse(localStorage.getItem("starships-names")) || []
  })
</script>
