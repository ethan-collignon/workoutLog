import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
    const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
    const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
    const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

    const workoutUpdate = (event, workout) => { //function takes in two arguments. 1st prevents page reload. 2nd specifies the workout needing an update in our db
        event.preventDefault();
        fetch(`http://localhost:3000/log/update/${props.workoutToUpdate.id}`, {
            // credentials: 'include',
            method: 'PUT',
            body:JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes}}), //Appending an object to the body of the request with a form matching the input expected by our server
            headers: new Headers({ //specifying the content sent by this fetch
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchWorkouts(); //fetch all workouts after completing the update and turn WorkoutEdit visibility off
            props.updateOff();
        })
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Log a Workout</ModalHeader>
            <ModalBody>
                <Form onSubmit={workoutUpdate}>
                    <FormGroup>
                        <Label htmlFor="result">Edit Result:</Label>    
                        <Input name="result" value={editRes} onChange={(e) => setEditRes(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>    
                        <Input name="description" value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="definition">Edit Definition:</Label>    
                        <Input name="definition" value={editDef} onChange={(e) => setEditDef(e.target.value)}>
                        <option></option>
                        <option value="Time">Time</option>
                        <option value="Weight">Weight</option>
                        <option value="Distance">Distance</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit">Update the Workout!</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default WorkoutEdit;