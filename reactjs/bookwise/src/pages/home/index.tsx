import { useEffect, useState } from 'react'
import { MyComponent } from './Hello'
import { api } from '@/lib/axios'

export default function Home() {
  const [data, setData] = useState({
    bookName: '',
    bookCover: '',
    bookSummary: '',
    userName: '',
    updatedAt: '',
  })

  useEffect(() => {
    api
      .get('/hello')
      .then((res) => setData(res.data))
      .catch((error) => console.log({ error }))
  }, [])

  return <MyComponent {...data} />
}
