<template>
  <div class="home">
    <div class="container">
      <h1>Planets</h1>

      <div class="content">
        <!-- Content names -->
        <aside class="content__names">
          <div
            v-for="(planet, index) in planets"
            :key="planet.created"
            @click="getDetail(planet, index)"
            class="content__name">
            {{ planet.name }}
          </div>
          <vue-simple-spinner
            v-if="planets.length === 0"
            size="64"
            speed="1"
            spacing="4"
            line-size="9"
            line-bg-color="#555"></vue-simple-spinner>
        </aside>

        <!-- Content block -->
        <section>
          <div class="content__block">
            <img v-if="_imgURL" :src="_imgURL" :alt="planetInfo.name" width="300" height="300" />
            <div v-if="_imgURL" class="content__info">
              <p>
                Name: <span>{{ planetInfo.name }}</span>
              </p>
              <p>
                Population: <span>{{ planetInfo.population }}</span>
              </p>
              <p>
                Rotation: <span>{{ planetInfo.rotation_period }}</span>
              </p>
              <p>
                Diameter: <span>{{ planetInfo.diameter }}</span>
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

  const _imgURL = ref("")
  let id = ref(0)

  const planets = ref([])
  const planetInfo = ref([])

  getNames("/planets", planets)

  const getDetail = (planet, index) => {
    id.value = index + 1
    _imgURL.value = `https://starwars-visualguide.com/assets/img/planets/${id.value}.jpg`
    planetInfo.value = planet
  }

  watch(planets, (newVal) => {
    localStorage.setItem("planets-names", JSON.stringify(newVal))
  })

  onMounted(() => {
    planets.value = JSON.parse(localStorage.getItem("planets-names")) || []
  })
</script>
