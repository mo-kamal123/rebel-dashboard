import { useQuery } from '@tanstack/react-query'
import { fetchUserById } from '../api/usersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'
import { normalizeUserDetail } from '../lib/normalizeUser'

export function useUserQuery(id) {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => fetchUserById(id),
    enabled: Boolean(id),
    select: normalizeUserDetail,
  })
}
