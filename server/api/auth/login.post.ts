import bcrypt from 'bcryptjs'

import {
  loginSchema
} from '~/server/utils/validation'

import {
  createToken
} from '~/server/utils/auth'

import {
  findUserByUsername
} from '~/server/utils/database'

export default defineEventHandler(
  async (event) => {

    const body = await readBody(event)

    /*
     * Server-side validation
     */
    const validation =
      loginSchema.safeParse(body)

    if (!validation.success) {

      throw createError({
        statusCode: 400,
        message: 'Invalid login data'
      })
    }

    const {
      username,
      password
    } = validation.data

    /*
     * Find user
     */
    const user =
      await findUserByUsername(username)

    if (!user) {

      throw createError({
        statusCode: 401,
        message:
          'Invalid username or password'
      })
    }

    /*
     * Check password
     */
    const passwordValid =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!passwordValid) {

      throw createError({
        statusCode: 401,
        message:
          'Invalid username or password'
      })
    }

    /*
     * Create JWT
     */
    const token = createToken({
      userId: user.id,
      username: user.username,
      role: user.role
    })

    /*
     * HTTP-only cookie
     */
    setCookie(
      event,
      'auth_token',
      token,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          'production',

        sameSite: 'lax',

        maxAge:
          60 * 60,

        path: '/'
      }
    )

    return {
      success: true
    }
  }
)