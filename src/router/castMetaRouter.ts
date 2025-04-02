import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean
    MenuOnly: boolean
    icon?: string
    roles?: string[]
  }
}
