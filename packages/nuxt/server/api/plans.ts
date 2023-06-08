import axios from 'axios'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  try {
    const result = await axios.get(`${config.public.api_endpoint}/plans`)
    return JSON.parse(result.data.body)
  } catch (err) {
    console.log(err)
    return []
  }
})
