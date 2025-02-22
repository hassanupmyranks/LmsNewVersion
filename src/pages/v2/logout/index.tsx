import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ROUTES_V2 from '../../../const/V2/routes'
import { updateIsLoggedIn } from '../../../redux/userDetailsV2/action'

const LoginOut = (): ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(updateIsLoggedIn(false))

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')

    history.push(ROUTES_V2.LOGIN)
  }, [dispatch, history])

  return <div></div>
}

export default LoginOut
