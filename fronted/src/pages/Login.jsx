import React from 'react'
import AuthForm from '../components/common/AuthForm'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { login } = useAuth();


   return <AuthForm type="login" onSubmit={login} />;
  
}

export default Login
