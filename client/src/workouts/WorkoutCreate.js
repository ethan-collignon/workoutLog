import React, {useState, useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');

    const handleSubmit = (e) => { //function grabs and event. Because handleSubmit will be triggered as form data is submitted, we need to grab the event to prevent default page reload.
        e.preventDefault();
        fetch('http://localhost:3000/log/create/', {//fetching to the server endpoint
            method: 'POST',
            body: JSON.stringify({log: {description: description, definition: definition, result: result}}), //packaging des,def, res into object. Needs to match server expectations.
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token //Guarded route. Need to provide session token.
            })
        }).then((res) => res.json())
        .then((logData) => { //catching json-ified data and logging it so we can verify success.
            console.log(logData);
            setDescription(''); //reset all the state variables so user can input fresh workout
            setDefinition(''); //reset all the state variables so user can input fresh workout
            setResult(''); //reset all the state variables so user can input fresh workout
            props.fetchWorkouts(); //'?'
        })
    }

    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description"/>
                    <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}/*Event handlers fire a callback function to record the input user data into our state variables*//> 
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition"/>
                    <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}/*Event handlers fire a callback function to record the input user data into our state variables*/>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result"/>
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}/*Event handlers fire a callback function to record the input user data into our state variables*//>
                </FormGroup>
                <br/>
                <Button type="submit">Click to Submit</Button> 
            </Form>
        </>
    )
}

export default WorkoutCreate;