import React from 'react'

const SignedInMenu = ({logout}) => {
  return (
    <div>
      <li onClick={logout} className="green"><a href="">Logout</a></li>
          
    </div>
  )
}

export default SignedInMenu;
