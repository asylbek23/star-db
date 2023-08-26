import axios from "axios"

const baseURL = "https://swapi.dev/api/"

const http = axios.create({
  baseURL: baseURL,
})

http.defaults.params = {}

export default http
