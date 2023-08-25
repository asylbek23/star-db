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
      <img :src="_imgURL" :alt="planet.name" width="200" height="200" />
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
  import { ref, onMounted, onBeforeMount } from "vue"
  import axios from "axios"

  const planet = ref({})
  const _imgURL = ref("")
  let id = ref("")
  // const _imgURL = ref("https://starwars-visualguide.com/assets/img")

  const getDataByTime = async () => {
    id.value = Math.floor((Math.random() * 18) | 0) + 2

    await axios
      .get(`https://swapi.dev/api/planets/${id.value}`)
      .then((data) => {
        // console.log(data)
        planet.value = data.data
        _imgURL.value = `https://starwars-visualguide.com/assets/img/planets/${id.value}.jpg`
        // _imgURL.value = `${_imgURL.value}/planets/${id.value}.jpg`
      })
      .catch((err) => {
        console.log(err)
      })
  }

  onBeforeMount(() => {
    getDataByTime()
  })

  onMounted(() => {
    setInterval(getDataByTime, 5000)
  })

  // this.interval = setInterval(this.updatePlanet, 1000)
</script>
