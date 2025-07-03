import { Button } from '@/components/ui/button';
import { Card, CardAction } from '@/components/ui/card';
import { navlist } from '@/constants/constants';
import Link from 'next/link';
import React from 'react'


const navitems:navlist = [
  {
    name: 'Admin dashboard',
    href: '/admin'
  },
  {
    name: 'Lecurer dashboard',
    href: '/lecturer'
  },
  {
    name: 'Student dashboard',
    href: '/student'
  }
]

const Home = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center gap-4 bg-gradient-to-br from-slate-700 to-gray-700 via-75%'>
        {navitems.map((item, index)=>(
          <Card key={index} className='bg-white/45 backdrop-blur-md rounded-sm border-white border p-3 group'>
              <CardAction>
                <Button asChild className='group-hover:bg-emerald-400 transition-all duration-300 ease-linear hover:bg-teal-600'>
                  <Link href={item.href}>
                    {item.name}
                  </Link>
                </Button>
              </CardAction>
          </Card>
        ))}
    </div>
  )
}

export default Home
