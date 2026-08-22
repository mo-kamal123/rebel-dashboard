import { Link, useNavigate } from 'react-router-dom'
import { formatDate } from '../../../shared/lib/format'
import { Badge } from '../../../shared/components/ui/Badge'
import { USER_ROLE_LABELS } from '../../../shared/models/user'

export function UserTable({ users }) {
  const navigate = useNavigate()

  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Cart items</th>
            <th>Favorites</th>
            <th>Joined</th>
            <th className="text-right">View</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="cursor-pointer"
              onClick={() => navigate(`/users/${user.id}`)}
            >
              <td>
                <div>
                  <p className="font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40">{user.email}</p>
                </div>
              </td>
              <td>
                <Badge status={user.role}>{USER_ROLE_LABELS[user.role] ?? user.role}</Badge>
              </td>
              <td>{user.phoneNumber || '—'}</td>
              <td>{user.cartItemsCount}</td>
              <td>{user.favoritesCount}</td>
              <td className="text-white/50">{formatDate(user.createdAt)}</td>
              <td className="text-right">
                <Link
                  to={`/users/${user.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-sm text-rebel-red hover:text-[#14d966]"
                >
                  Details →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
