import React,{useContext} from 'react'
import { CoffeeContext } from './ApifetchExample'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

  const {isAdmin ,isLogin}=useContext(CoffeeContext);
  
  if(!isLogin){
    return <Navigate to="/login"/>
  }
  if(!isAdmin){
    return <Navigate to="/"/>
  }
  return children;
  
}

export default AdminRoute