export default defineEventHandler(
  async (event) => {

    const user = event.context.user

    if (!user) {

      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    return {
      id: user.userId,
      username: user.username,
      role: user.role
    }
  }
)