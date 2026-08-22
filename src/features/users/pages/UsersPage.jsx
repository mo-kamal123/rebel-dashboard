import { PageHeader } from '../../../shared/components/ui/PageHeader'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { EmptyState } from '../../../shared/components/ui/EmptyState'
import { UserTable } from '../components/UserTable'
import { useUsersQuery } from '../hooks/useUsersQuery'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function UsersPage() {
  const usersQuery = useUsersQuery()

  if (usersQuery.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (usersQuery.isError) {
    return (
      <EmptyState
        title="Could not load users"
        description={getApiErrorMessage(usersQuery.error)}
      />
    )
  }

  const users = usersQuery.data ?? []

  return (
    <div>
      <PageHeader
        kicker="Customers"
        title="Users"
        description="Browse registered customers, their roles, and shopping activity."
      />

      {users.length === 0 ? (
        <EmptyState
          title="No users yet"
          description="Users will appear here as soon as customers register on the storefront."
        />
      ) : (
        <UserTable users={users} />
      )}
    </div>
  )
}
