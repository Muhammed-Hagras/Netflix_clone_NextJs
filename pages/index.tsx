import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
 <div className="flex justify-center p-5">
  <h2 className="text-green-500">Netflix Clone</h2>
 </div>
  )
}
