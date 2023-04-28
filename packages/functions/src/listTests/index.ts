import { ApiHandler } from 'sst/node/api'

import { listTests } from '@mpt-sst/core/src/test/index'
import { Test } from '@mpt-types/Test'

export const handler = ApiHandler(async (_evt) => {
  const result = await listTests()
  const tests: Test[] = result.map((test) => ({
    id: test.id,
    name: test.name,
    description: test.description,
    type: test.type,
    thumbnail: test.thumbnail,
    instructions: test.instructions
  }))
  return {
    body: JSON.stringify(tests)
  }
})
