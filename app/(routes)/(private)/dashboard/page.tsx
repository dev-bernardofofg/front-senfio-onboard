"use client"

import { redirect } from "next/navigation"

const DashboardPage = () => {
  const getUser = localStorage.getItem("user")

  if (!getUser) {
    redirect("/auth")
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default DashboardPage