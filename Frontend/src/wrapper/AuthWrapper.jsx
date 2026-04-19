import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const AuthWrapper = (props) => {
  const { users } = useSelector(state => state.userReducer);

  return (
    <>
         {users && users?.isAdmin ? (
            props.children
        ) : (
            <Navigate to="/products" />
        )}
    </>
  )
}

export default AuthWrapper