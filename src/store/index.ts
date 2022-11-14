import piniaPersistedState from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import { useSystemStore } from './module/system'
import { usePlayerStore } from './module/player'

export const pinia = createPinia()

pinia.use(piniaPersistedState)

export const useStore = () => ({
  system: useSystemStore(),
  player: usePlayerStore()
})
