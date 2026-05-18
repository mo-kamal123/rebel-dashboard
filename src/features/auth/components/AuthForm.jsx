import { Input } from '../../../shared/components/ui/Input'
import { Button } from '../../../shared/components/ui/Button'
import { Spinner } from '../../../shared/components/ui/Spinner'
import { useAuthForm } from '../hooks/useAuthForm'
import { useLoginMutation } from '../hooks/useLoginMutation'
import { getApiErrorMessage } from '../../../shared/lib/getApiErrorMessage'

export function AuthForm() {
  const { values, handleChange } = useAuthForm()
  const loginMutation = useLoginMutation()

  const error =
    loginMutation.error instanceof Error && loginMutation.error.message.startsWith('Admin')
      ? loginMutation.error.message
      : getApiErrorMessage(loginMutation.error)

  const handleSubmit = (event) => {
    event.preventDefault()
    loginMutation.mutate(values)
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel mx-auto w-full max-w-md space-y-5 p-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-rebel-red">Rebel</p>
        <h1 className="mt-2 font-display text-3xl uppercase text-white">Admin login</h1>
        <p className="mt-2 text-sm text-white/50">Sign in with your admin account</p>
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={values.password}
        onChange={handleChange}
      />

      {error && loginMutation.isError ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? <Spinner className="size-4 border-t-white" /> : 'Sign in'}
      </Button>
    </form>
  )
}
