import {
  getAuthenticatedUser
} from '~/server/utils/auth'

export default defineEventHandler(
  async (event) => {

    const url = getRequestURL(event)

    if (!url.pathname.startsWith('/api/')) {
      return
    }

    if (
      url.pathname ===
      '/api/auth/login'
    ) {
      return
    }

    if (
      url.pathname ===
      '/api/auth/logout'
    ) {
      return
    }

    const user =
      getAuthenticatedUser(event)

    event.context.user = user
  }
)