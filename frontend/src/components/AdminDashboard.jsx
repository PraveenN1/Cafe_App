import React,{useContext} from 'react'
import { CoffeeContext } from './ApifetchExample'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({children}) => {

  const {isAdmin}=useContext(CoffeeContext);
    return (
    isAdmin?children:<Navigate to="/login"/>
  );
}

export default AdminDashboar