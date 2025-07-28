import Link from "next/link"

const AuthPage = () => {
  return (
    <div>
      <h1>AuthPage</h1>
      <Link href="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  )
}

export default AuthPage