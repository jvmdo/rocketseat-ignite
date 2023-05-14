import { useEffect, useState } from 'react'
import { MyComponent } from './Hello'
import { api } from '@/lib/axios'

type Data = {
  bookName: string
  bookCover: string
  bookSummary: string
  userName: string
  updatedAt: string
}

export default function Home() {
  const [data, setData] = useState<Data | undefined>()

  useEffect(() => {
    api
      .get('/hello')
      .then((res) => setData(res.data))
      .catch((error) => console.log({ error }))
  }, [])

  return data && <MyComponent {...data} />
}
