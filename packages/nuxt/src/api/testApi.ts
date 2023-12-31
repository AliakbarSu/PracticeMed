import axios from 'axios'
import { getAuthToken } from '../auth'

export const loadTestApi = async (testId: string) => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const token = await getAuthToken()
  const response = await axios.get(`${api_endpoint}/tests/${testId}/load`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data.body
}

export const loadDemoTestApi = async () => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const response = await axios.get(`${api_endpoint}/tests/demo`)
  return response.data.body
}
