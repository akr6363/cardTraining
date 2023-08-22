import { useEffect } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

import { EmptyPage } from '@/components/common/empty-page/empty-page.tsx'
import { Preloader } from '@/components/common/preloader/preloader.tsx'
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
import { authSlice } from '@/services/auth/auth.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'
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
  const error = useAppSelector(state => state.authSlice.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    dispatch(authSlice.actions.setError(''))
  }, [error])

  return (
    <>
      <ToastContainer />
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
      {
        element: <PublicRoutes />,
        children: publicRoutes,
      },
      // ...publicRoutes,
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

  if (isLoading)
    return (
      <EmptyPage>
        <Preloader />
      </EmptyPage>
    )

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
function PublicRoutes() {
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading)
    return (
      <EmptyPage>
        <Preloader />
      </EmptyPage>
    )

  const isAuthenticated = !data

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
