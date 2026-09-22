import jwt from 'jsonwebtoken'

export interface AuthUser {
  userId: number
  username: string
  role: 'admin' | 'employee'
}

export const createToken = (
  user: AuthUser
) => {

  return jwt.sign(
    user,
    process.env.JWT_SECRET!,
    {
      expiresIn: '1h'
    }
  )
}

export const getAuthenticatedUser = (
  event: any
): AuthUser => {

  const token = getCookie(
    event,
    'auth_token'
  )

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  try {

    return jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthUser

  } catch {

    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }
}