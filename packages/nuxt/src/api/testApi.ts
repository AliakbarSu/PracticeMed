import axios from 'axios'
import { useAuthStore } from '../store/auth'
import type { Answer, SubmittedAnswer } from '@/types/test'

export const loadTestApi = async (testId: string) => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.get(`${api_endpoint}/tests/${testId}/load`, {
    headers: {
      Authorization: `Bearer ${authStore.token}`
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

export const submitTestApi = async (
  testId: string,
  payload: SubmittedAnswer
) => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.post(
    `${api_endpoint}/test/${testId}/result`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  )
  return response.data.body.id as string
}

export const submitAnswerApi = async (payload: Answer, testId?: string) => {
  const {
    public: { api_endpoint }
  } = useRuntimeConfig()
  const authStore = useAuthStore()
  const response = await axios.post(
    `${api_endpoint}/test/${testId}/submit`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    }
  )
  return response.data.body.id as string
}
