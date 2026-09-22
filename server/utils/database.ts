export interface User {
  id: number
  username: string
  password: string
  role: 'admin' | 'employee'
}

const users: User[] = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$10$example',
    role: 'admin'
  },
  {
    id: 2,
    username: 'employee',
    password: '$2b$10$example',
    role: 'employee'
  }
]

export const findUserByUsername = async (
  username: string
) => {
  return users.find(
    user => user.username === username
  )
}