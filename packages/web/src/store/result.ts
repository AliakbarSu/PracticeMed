import type { Plan } from '@/types/plans'
import type { Test } from '@/types/test'
import type { Profile, UserAppMetadata } from '@/types/user'
import { useAuth0 } from '@auth0/auth0-vue'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useResultStore = defineStore('result', () => {
  return {}
})
