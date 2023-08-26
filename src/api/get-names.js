import axios from "@/plugins/axios"

export const getNames = async (urn, nameList) => {
  const names = await axios
    .get(urn)
    .then((data) => {
      nameList.value = data.data.results
    })
    .catch((err) => {
      console.log(err)
    })
  return names
}
