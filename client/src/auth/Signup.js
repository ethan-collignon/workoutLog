import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState(''); //State Variable(username) which will be fed info from input fields in form
    const [password, setPassword] = useState(''); //State Variable(password) which will be fed info from input fields in form

    const handleSubmit = (e) => { 
        e.preventDefault(); //Taking in an event & preventing default (page refresh)
        fetch("http://localhost:3000/user/register", { //fetch to the url endpoint
            method: 'POST', //Method of this fetch is a POST
            body: JSON.stringify({user:{username: username, passwordhash: password}}), //Including a body with our state set as user. Correlates to the backend.
            headers: new Headers({
                'Content-Type': 'application/json', //lets our server know what type of info we are sending to it to decide if it can be handled
                'Authorization': `Bearer ${props.token}`
            })
        }).then (
            (response) => response.json() //resolves promise from fetch and returning it as JSON
        ).then((data) => {
            console.log(data);
            props.updateToken(data.SessionToken) //resolving .json promise and taking data we get from server then calling our updateToken function with the session token we get back
        })
        console.log(username, password); //log so we can grab and use our state variable & show our state variables do reflect the most recent data in the input forms
    }

    return( //! Add form validation
        <div> 
            <h1>Sign Up</h1> 
            <Form onSubmit={handleSubmit}/*onSubmit handler will listen and respond to a submit */> 
                <FormGroup>
                    <Label htmlFor="username">Username</Label> 
                    <Input onChange={(e) => setUsername(e.target.value)} /*eventhandler allows us to grab input's the user typed */ name="username" value={username}/> 
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} /*eventhandler allows us to grab input's the user typed */ name="password" value={password}/>
                </FormGroup>
                <Button type="submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;