import { SSTConfig } from 'sst'
import { API } from './stacks/PracticeMedApi'
import { NuxtStack } from './stacks/Nuxt'
import { QueueStack } from './stacks/Queue'

export default {
  config(_input) {
    return {
      name: 'mpt-sst',
      region: 'ap-southeast-2'
    }
  },
  stacks(app) {
    app.stack(QueueStack).stack(API).stack(NuxtStack)
  }
} satisfies SSTConfig
