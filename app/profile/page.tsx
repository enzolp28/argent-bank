'use client';

import React, { useEffect } from 'react'
import '@/components/styles/UserProfile.css'
import Account from '@/components/Account'
import UserProfile from '@/components/UserProfile'
import { accounts } from '@/data/transaction'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Profile() {
  const router = useRouter()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="bg-dark">
      <UserProfile />
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  )
}
