export default defineEventHandler(
  async (event) => {

    const user =
      event.context.user

    if (!user) {

      throw createError({
        statusCode: 401,
        message: 'Unauthorized'
      })
    }

    if (
      user.role !== 'admin'
    ) {

      throw createError({
        statusCode: 403,
        message: 'Forbidden'
      })
    }

    return {
      success: true,

      message:
        'Welcome to admin API',

      data: {
        totalUsers: 100,
        activeUsers: 85
      }
    }
  }
)


