import { useEffect } from 'react'

import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'

import { Header } from '@/components/ui'
import { Cards } from '@/pages/cards/cards.tsx'
import { Decks } from '@/pages/decks/decks.tsx'
import SignInPage from '@/pages/sign-in/sign-in.tsx'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
import { authSlice } from '@/services/auth/auth-slice.ts'
import { useAppDispatch } from '@/services/store.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <SignInPage />,
  },
]

const privateRoutes: RouteObject[] = [
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
    ],
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useAuthMeQuery()

  useEffect(() => {
    if (data) {
      dispatch(authSlice.actions.setAuthData(data))
    }
  }, [data])
  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
