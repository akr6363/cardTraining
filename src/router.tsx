import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Header } from '@/components/ui'
import { PageNotFound } from '@/pages/404/page-not-found.tsx'
import { Cards } from '@/pages/cards/cards.tsx'
import { Decks } from '@/pages/decks/decks.tsx'
import { LearnPage } from '@/pages/learn/learn.tsx'
import { NewPasswordPage } from '@/pages/new-password/new-password.tsx'
import { ProfilePage } from '@/pages/profile/profile.tsx'
import { RecoverPasswordPage } from '@/pages/recover-password/recover-password.tsx'
import { SignInPage } from '@/pages/sign-in/sign-in.tsx'
import { SignUpPage } from '@/pages/sign-up/sign-up.tsx'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
const Container = () => {
  return (
    <div className={'authContainer'}>
      <Outlet />
    </div>
  )
}
const publicRoutes: RouteObject[] = [
  {
    element: <Container />,
    children: [
      {
        path: '/login',
        element: <SignInPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/recover-password',
        element: <RecoverPasswordPage />,
      },
      {
        path: '/new-password/:token',
        element: <NewPasswordPage />,
      },
    ],
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Container />,
    children: [
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/:id/learn',
        element: <LearnPage />,
      },
    ],
  },
  {
    path: '/',
    element: <Decks />,
  },
  {
    path: '/:id',
    element: <Cards />,
  },
]
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateRoutes />,
        children: privateRoutes,
      },
      ...publicRoutes,
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
