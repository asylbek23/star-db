<template>
  <header>
    <nav>
      <router-link to="/" class="home-link">Star DB</router-link>
      <router-link to="/people">People</router-link>
      <router-link to="/planets">Planets</router-link>
      <router-link to="/starships">Starships</router-link>
    </nav>
  </header>

  <main>
    <!-- Random planet -->
    <div class="random-planet">
      <img :src="imgURL" :alt="planet.name" width="200" height="200" />
      <div class="random-planet__descr">
        <h3>{{ planet.name }}</h3>
        <p>
          Population: <span>{{ planet.population }}</span>
        </p>
        <p>
          Rotation period: <span>{{ planet.rotation_period }}</span>
        </p>
        <p>
          Diametr: <span>{{ planet.diameter }}</span>
        </p>
        <button class="btn btn--danger">Throw error</button>
      </div>
    </div>
    <router-view />
  </main>
</template>

<script setup>
  import { ref } from "vue"
  import { getPlanet } from "@/api/get-planet"

  let id = ref("")
  const planet = ref({})
  const imgURL = ref("")

  const getDataByTime = async () => {
    id.value = Math.floor((Math.random() * 18) | 0) + 2

    getPlanet(
      `planets/${id.value}`,
      planet,
      imgURL,
      `https://starwars-visualguide.com/assets/img/planets/${id.value}.jpg`
    )
  }

  getDataByTime()
  setInterval(getDataByTime, 7000)
</script>
