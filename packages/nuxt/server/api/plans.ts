import axios from 'axios'
const config = useRuntimeConfig()
export default defineEventHandler(async (event) => {
  try {
    console.log(config)
    const result = await axios.get(`${config.public.api_endpoint}/plans`)
    return JSON.parse(result.data.body)
  } catch (err) {
    console.log(err)
    return []
  }
})
