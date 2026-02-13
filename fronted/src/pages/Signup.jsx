import React from 'react'
import AuthForm from '../components/common/AuthForm'
import { useAuth } from '../hooks/useAuth'
const Signup = () => {

    const {signup} = useAuth();
   return <AuthForm type="signup" onSubmit={signup} />;
}

export default Signup
