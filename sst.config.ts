import { SSTConfig } from 'sst'
import { API } from './stacks/PracticeMedApi'
import { WEB } from './stacks/Web'

export default {
  config(_input) {
    return {
      name: 'mpt-sst',
      region: 'ap-southeast-2'
    }
  },
  stacks(app) {
    app.stack(API).stack(WEB)
  }
} satisfies SSTConfig
