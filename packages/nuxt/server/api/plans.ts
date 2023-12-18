import axios from 'axios'
import { endpoints } from '../../../../resources/endpoints'
import { dev } from '../../../../resources/stages'
export default defineEventHandler(async (event) => {
  try {
    const api_url = (process.env.LOCAL_ENV = dev
      ? endpoints.custom_domains.api.dev
      : endpoints.custom_domains.api.prod)
    const result = await axios.get(`https://${api_url}/api/plans`)
    return JSON.parse(result.data.body)
  } catch (err) {
    console.log(err)
    return []
  }
})
