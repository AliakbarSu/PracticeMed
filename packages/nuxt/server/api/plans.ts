import axios from 'axios'
export default defineEventHandler(async (event) => {
  try {
    const {
      public: { api_endpoint }
    } = useRuntimeConfig()
    const result = await axios.get(`${api_endpoint}/plans`)
    return JSON.parse(result.data.body)
  } catch (err) {
    console.log(err)
    return []
  }
})
