// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

import { useHistory } from 'react-router-dom'
import { CustomToastMessage } from '../ToastMessage'
import { useDispatch } from 'react-redux'
import {
  updatePassword,
  updateUserData,
  updateUserName
} from '../../../redux/userDetailsV2/action'
import { refreshTokenAPI } from '../../../helpers/V2/apis'

// ** Defaults
const defaultProvider: any = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const router = useHistory()
  const [, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('refreshToken')!
    if (token) {
      setLoading(true)

      refreshTokenAPI({ refreshToken: `${token}` })
        .then((res) => {
          if (res.data.user) {
            dispatch(updateUserData(res?.data?.user))
            if (res?.data?.user?.username) {
              dispatch(updateUserName(res?.data?.user?.username || ''))
            }
            if (res?.data?.user?.password) {
              dispatch(updatePassword(res?.data?.user?.password || ''))
            }

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('refreshToken', res.data.refreshToken)
          }
        })
        .catch((error) => {
          CustomToastMessage(error.message, 'error')
          router.push('/')
        })

        .finally(() => setLoading(false))
    } else {
      router.push('/')
    }
  }, [dispatch, router])

  const values = {}

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
