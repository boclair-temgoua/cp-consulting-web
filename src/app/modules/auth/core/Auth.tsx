import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getOneUser, getUserByToken } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUserFormToken } from './AuthHelpers';

type AuthContextProps = {
  auth: any | undefined
  saveAuth: (auth: any | undefined) => void
  // oneUser: OnUserModel | undefined
  // setOneUser: Dispatch<SetStateAction<OnUserModel | undefined>>
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  // oneUser: undefined,
  // setOneUser: () => { },
  setCurrentUser: () => { },
  currentUser: undefined,
  logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}



const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<any | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState(getCurrentUserFormToken())

  const fetchOneUser = async () => await getOneUser({ userId: currentUser?.id })
  const { data } = useQuery(['user'], () => fetchOneUser(), {
    refetchOnWindowFocus: false
    // staleTime: 60_000,
  })
  const user: any = data?.data
  const saveAuth = (auth: any | undefined) => { setAuth(auth) }

  const logout = () => {
    // saveAuth(undefined)
     setCurrentUser(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, ...user, saveAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (!didRequest.current) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }

      return () => (didRequest.current = true)
    }

    if (auth && auth.api_token) {
      requestUser(auth.api_token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
