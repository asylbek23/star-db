import axios from "@/plugins/axios"

export const getPlanet = async (urn, nameList, imgREF, imgURL) => {
  const planets = await axios
    .get(urn)
    .then((data) => {
      nameList.value = data.data
      imgREF.value = imgURL
    })
    .catch((err) => {
      console.log(err)
    })
  return planets
}
