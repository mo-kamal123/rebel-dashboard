import { Dropdown } from '../../../shared/components/ui/Dropdown'
import { USER_ROLES, USER_ROLE_LABELS } from '../../../shared/models/user'

const options = USER_ROLES.map((role) => ({
  value: role,
  label: USER_ROLE_LABELS[role],
}))

export function UserRoleSelect({ value, onChange, disabled }) {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={onChange}
      disabled={disabled}
      placeholder="Set role…"
    />
  )
}
