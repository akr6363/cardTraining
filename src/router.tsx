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
    ],
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
  // const dispatch = useAppDispatch()
  const { data, isLoading } = useAuthMeQuery()

  // useEffect(() => {
  //   if (data) {
  //     dispatch(authSlice.actions.setAuthData(data))
  //   }
  // }, [data])
  if (isLoading) return <div>Loading...</div>

  const isAuthenticated = !!data

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
