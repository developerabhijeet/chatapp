import React, { useContext,useEffect, useState } from 'react'
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router-dom';
const Signup = () => {
  const {user, setUser} = useContext(UserContext);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profession, setProfession] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [professionError, setProfessionError] = useState('')
  const submitHandler = async e=>{
    e.preventDefault();
    setEmailError('');
    setNameError('');
    setPasswordError('');
    setProfessionError('');
    console.log(name,email,password,profession)
    try{
      const res = await fetch('http://localhost:5000/signup',{
      
      method: 'POST',
        credentials: 'include',
        body: JSON.stringify({name,email,password,profession}),
        headers:{'Content-Type': 'application/json'}
      });
      const data = await res.json();
      console.log(data);
      if(data.errors){
        setEmailError(data.errors.email);
        setNameError(data.errors.name);
        setPasswordError(data.errors.password);
        setProfessionError(data.errors.profession);
      }
      if(data.user){
        setUser(data.user)
      }
    }catch(error){
      console.log(error);

    }
  }
  if(user){
    return <Redirect to="/"/>
  }
  return (
    <div className="row">
      <h3>Welcome to Signup</h3>
      <form className="col s12" onSubmit={submitHandler}>
        <div className="row">
          <div className="input-field col s12">
            <input id="name" type="text" 
            className="validate"
            value={name} 
            onChange = {e=>setName(e.target.value)}/>
            <div className="name error red-text">{nameError}</div>
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
              <input id="email" type="email" 
              className="validate"
              value={email} 
            onChange = {e=>setEmail(e.target.value)}
             />
             <div className="email error red-text">{emailError}</div>
              <label htmlFor="email">Email</label>
              </div>
          </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" 
            className="validate" 
            value={password} 
            onChange = {e=>setPassword(e.target.value)}
            />
            <div className="password error red-text">{passwordError}</div>
            <label htmlFor="password">Password</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s12">
            <input id="profession" type="text" 
            className="validate"
            value={profession} 
            onChange = {e=>setProfession(e.target.value)}
            />
            <div className="profession error red-text">{professionError}</div>
            <label htmlFor="profession">Profession</label>
          </div>
        </div>
        <button className="btn">Sign Up</button>
      </form>
    </div>

  )
}

export default Signup;
