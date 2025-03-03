'use client';

import '@/app/globals.css'
import SignIn from '@/components/SignIn'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function SignInPage() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/profile')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) {
    return null
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <SignIn />
      </section>
    </main>
  )
}
