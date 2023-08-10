import { useEffect } from 'react'

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
  Outlet,
  Navigate,
} from 'react-router-dom'

import { Header } from '@/components/ui'
import { Decks } from '@/pages/decks/decks.tsx'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
import { authSlice } from '@/services/auth/auth-slice.ts'
import { useAppDispatch } from '@/services/store.ts'

const publicRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <div>login</div>,
  },
]

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Decks />,
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
  const dispatch = useAppDispatch()
  const { data } = useAuthMeQuery({})

  useEffect(() => {
    if (data) {
      dispatch(authSlice.actions.setAuthData(data))
    }
  }, [data])

  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
