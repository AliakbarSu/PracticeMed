import { SSTConfig } from 'sst'
import { API } from './stacks/PracticeMedApi'
import { NuxtStack } from './stacks/Nuxt'
import { QueueStack } from "./stacks/Queue"

export default {
  config(_input) {
    return {
      name: 'mpt-sst',
      region: 'ap-southeast-2'
    }
  },
  stacks(app) {
    app.stack(API).stack(NuxtStack).stack(QueueStack)
  }
} satisfies SSTConfig
