import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/store/authSlice'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/products', label: 'Products' },
  { to: '/orders', label: 'Orders' },
]

export function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-white/10 bg-black/40 px-4 py-6">
      <div className="mb-8 px-2">
        <p className="text-xs uppercase tracking-[0.4em] text-rebel-red">Rebel</p>
        <h1 className="font-display text-2xl uppercase text-white">Admin</h1>
        {user?.name ? <p className="mt-1 truncate text-xs text-white/40">{user.name}</p> : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2.5 text-sm transition ${
                isActive
                  ? 'bg-rebel-red/15 text-rebel-red'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-4 rounded-xl border border-white/10 px-3 py-2.5 text-left text-sm text-white/50 transition hover:border-white/20 hover:text-white"
      >
        Sign out
      </button>
    </aside>
  )
}
