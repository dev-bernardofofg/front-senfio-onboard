import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <h1 className="text-4xl font-bold">Senfio</h1>
      <p className="text-lg">Coletor de cupons para o Senfio</p>
      <Link href="/auth">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Entrar
        </button>
      </Link>
    </div>
  )
}
