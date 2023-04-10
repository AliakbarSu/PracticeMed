import { SSTConfig } from 'sst'
import { API } from './stacks/Mpt'

export default {
  config(_input) {
    return {
      name: 'mpt-sst',
      region: 'us-east-1'
    }
  },
  stacks(app) {
    app.stack(API)
  }
} satisfies SSTConfig
