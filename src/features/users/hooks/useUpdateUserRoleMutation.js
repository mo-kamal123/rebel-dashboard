import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserRole } from '../api/usersApi'
import { queryKeys } from '../../../shared/lib/queryKeys'

export function useUpdateUserRoleMutation(userId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (role) => updateUserRole({ id: userId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users })
      queryClient.invalidateQueries({ queryKey: queryKeys.user(userId) })
    },
  })
}
