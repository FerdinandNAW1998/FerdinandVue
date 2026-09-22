interface User {
  id: number
  username: string
  role: 'admin' | 'employee'
}

export const useAuth = () => {

  const user =
    useState<User | null>(
      'auth-user',
      () => null
    )

  const loading =
    useState(
      'auth-loading',
      () => false
    )

  const fetchUser = async () => {

    loading.value = true

    try {

      const response =
        await $fetch<User>(
          '/api/auth/me'
        )

      user.value = response

    } catch {

      user.value = null

    } finally {

      loading.value = false
    }
  }

  const logout = async () => {

    await $fetch(
      '/api/auth/logout',
      {
        method: 'POST'
      }
    )

    user.value = null

    await navigateTo('/login')
  }

  return {
    user,
    loading,
    fetchUser,
    logout
  }
}