import React, { useState, useEffect } from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';
import WorkoutIndex from './workouts/WorkoutIndex';


function App() { //main Parent function
  const [sessionToken, setSessionToken] = useState('')// using the useState hook to create a new state variable, sessionToken

  useEffect(() => { //Effect Hook that runs at initial component load. Updates our sessionToken state variable IF Chrome has saved a sessionToken in localStorage
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  },[]) //passing an empty array as the 2nd argument. effects runs only upon initial component load

  const updateToken = (newToken) => {//Function that takes in a token. stores in both localStorage & state variable
    localStorage.setItem('token', newToken);          //*local storage is a secure place to store data and will persist as long as browser is open
    setSessionToken(newToken);                        //*State variable allows child components to quickly access the sessionToken for use
    console.log(sessionToken);
  }

  const clearToken = () => { //log out function
    localStorage.clear(); //Clear is a method that empties the object it is paired with. In this case localStorage
    setSessionToken(''); //setting sessiontoken back to empty?
  }

  const protectedView = () => { //Function that returns the result of ternary. Which checks to see if our sessionToken matches the token in local storage. If match, function fires off WorkoutIndex component. Otherwise, returns Auth component to the user can grab a token.
    return(sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/>
    : <Auth updateToken={updateToken}/>)
  }

  return ( //render method?
    <div>
      <Sitebar clickLogout={clearToken} /*passing in clearToken function to be passed to child*//> 
      {protectedView()}
    </div>
  );
}

export default App;
