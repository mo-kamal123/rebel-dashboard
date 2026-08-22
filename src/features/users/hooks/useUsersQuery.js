import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../api/usersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeUser } from '../lib/normalizeUser'

export function useUsersQuery() {
  return useQuery({
    queryKey: queryKeys.users,
    queryFn: fetchUsers,
    select: (users) => users.map(normalizeUser),
  })
}
