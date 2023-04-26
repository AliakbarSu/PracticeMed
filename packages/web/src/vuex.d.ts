// vuex.d.ts
import { Store, type StoreOptions } from 'vuex'
import { Auth0Plugin } from '@auth0/auth0-vue'
import { Auth0VueClient } from '@auth0/auth0-vue'
import type { RootState } from './store'

declare module '@vue/runtime-core' {
  // declare your own store states
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<RootState>
    $auth: Auth0VueClient<'Auth'>
  }
}
