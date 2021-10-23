import React from 'react';
import { Table, Button } from 'reactstrap';

const WorkoutTable = (props) => {
    const deleteWorkout = (workout) => {//function expects a workout
        fetch(`http://localhost:3000/log/${workout.id}`, { //fetching from server endpoint
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token //delete request is guarded by authentication
            })
        })
        .then(() => props.fetchWorkouts()) //re-fetch workouts for all of those that haven't been deleted
    }

    const workoutMapper = () => {
        return props.workouts.map((workout, index) => { //Mapping through our props.workout array
            return( //return is what will build the array
              <tr key={index}/*Need to create a new table row for every workout object*/ >  
                <th scope="row">{workout.id}</th>
                <td>{workout.result}</td>
                <td>{workout.description}</td>
                <td>{workout.definition}</td>
                <td>
                    <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}}>Update</Button> 
                    <Button color="danger" onclick={() => {deleteWorkout(workout)}}>Delete</Button>
                </td>
              </tr>
            )
        })
    }

    return(
        <>
        <h3>Workout History</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Result</th>
                    <th>Description</th>    
                    <th>Definition</th>
                </tr>
            </thead>
            <tbody>
                {workoutMapper()}
            </tbody>
        </Table>
        </>
    )
}

export default WorkoutTable;