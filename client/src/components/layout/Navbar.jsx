import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Chat</a>
          <a href="" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className="black"><a href="">Login</a></li>
            <li className="black"><a href="">Signup</a></li>
            <li className="black"><a href="">Logout</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
    <li className="white"><a href="sass.html">Login</a></li>
    <li className="white"><a href="badges.html">Signup</a></li>
    <li className="white"><a href="collapsible.html">Logout</a></li>
  </ul> 
    </div>
  )
}

export default Navbar
