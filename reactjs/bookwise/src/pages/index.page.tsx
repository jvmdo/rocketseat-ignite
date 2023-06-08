import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth].api'

// Render function is placed here instead of in './sign-in'
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

// By exporting from `./sign-in` directory, we tell Next.js
// that its index.jsx file is the home page
export { default } from './sign-in'
