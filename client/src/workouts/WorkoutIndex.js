import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';


const WorkoutIndex = (props) => { //main parent for the workout side
    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);
    const [workoutToUpdate, setWorkoutToUpdate] = useState({});

    const fetchWorkouts = () => { //fetching workouts from our server
        fetch('http://localhost:3000/log', {
            method: 'GET',
            headers: new Headers ({ //passing these as props. Needed so server knows who is making requests
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => res.json()) //resolves promise from fetch and returning it as JSON
        .then((logData) => {
            setWorkouts(logData)
        })
    }

    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    useEffect(() => { //function that will callback whatever function we give the useEffect one time at initial component load
        fetchWorkouts();
    }, []) 

    return(
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} /*Workoutcreate component call. FetchWorkout is prop. Token is passed as a prop so we can access endpoint*//>
                </Col>
                <Col md="9">
                    <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout} updateOn={updateOn} fetchWorkouts={fetchWorkouts} token={props.token} /*Workouttable call. *//>
                </Col>
                {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate} updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts}/> : <></>}
            </Row>
        </Container>
    )
}

export default WorkoutIndex;