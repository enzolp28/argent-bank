import React from 'react'
import '@/components/styles/UserProfile.css'
import Account from '@/components/Account'
import UserProfile from '@/components/UserProfile'
import { accounts } from '@/data/transaction'


export default function Profile() {


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
