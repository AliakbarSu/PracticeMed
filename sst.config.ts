import { SSTConfig } from 'sst'
import { API } from './stacks/PracticeMedApi'

export default {
  config(_input) {
    return {
      name: 'mpt-sst',
      region: 'ap-southeast-2'
    }
  },
  stacks(app) {
    app.stack(API)
  }
} satisfies SSTConfig
