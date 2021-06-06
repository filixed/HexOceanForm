import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Form, Col, Button, Spinner} from 'react-bootstrap';
import {setDishName, setDurationTime, setDishType, setNumber_of_slic, setDiameter, setSpiceness_scale, setSlice_of_bread} from '../../store/formSlice'
import axios from 'axios'

export default function App() {

  const [postError, setpostError] = useState(false)
  const [succes, setSuccess] = useState(false)
  const [loading, setloading] = useState(false)

  const addDish = async (dishName, durationTime, dishType, no_of_slices, diameter, spiciness_scale, slices_of_bread) => {
    const axiosConfig = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
    }
    let dishData = {}
    if(dishType === "pizza"){
      dishData = {
        name: dishName,
        preparation_time: durationTime,
        type: dishType,
        no_of_slices: parseInt(no_of_slices, 10),
        diameter: parseFloat(diameter, 10)
      }
    }
    else if(dishType === "soup"){
      dishData = {
        name: dishName,
        preparation_time: durationTime,
        type: dishType,
        spiciness_scale: parseInt(spiciness_scale, 10)
      }
    }
    else if(dishType === "sandwich"){
      dishData = {
        name: dishName,
        preparation_time: durationTime,
        type: dishType,
        slices_of_bread: parseInt(slices_of_bread)
      }
    }
    else{
      console.log("Coś poszło nie tak")
      setpostError(true)
    }

    const url = "ADD URL HERE"
    setloading(true)
    axios.post(url, dishData, axiosConfig)
    .then(res => {
      setloading(false)
      setSuccess(true)
      console.log(res)
    })
    .catch(err => {
      setpostError(true)
      console.log(err)
    })

  }

  const { register, handleSubmit, formState: { errors}, watch } = useForm();
  const onSubmit = data => {
    setDishName(data.dishname)
    setDurationTime(data.duration_time)
    setDishType(data.dishSelect)
    if(selectValue === "pizza"){
      setNumber_of_slic(data.no_of_slices)
      setDiameter(data.diameter)
    }
    else if(selectValue ==="soup"){
      setSpiceness_scale(data.spiceness_scale)
    }
    else if(selectValue ==="sandwich") {
      setSlice_of_bread(data.slice_of_bread)
    }
    else{
      errors.dishSelect = true
    }
    addDish(data.dishname, data.duration_time, data.dishSelect, data.no_of_slices, data.diameter, data.spiceness_scale, data.slice_of_bread)
    console.log(data);
  }
 

  const selectValue = watch("dishSelect", "pizza")
  


  return (
    
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
      <Form.Group as={Col} controlId="dishName">
          <Form.Label >Name</Form.Label>
          <Form.Control size="lg" as='input' name='dishname' placeholder="Name" {...register('dishname', {required: true})} />
          {errors.dishname && (
            <p style={{color:"red"}}>This field is required</p>
        )}
      </Form.Group>
      <Form.Group as={Col} controlId="dishTime">
          <Form.Label>Duration Time</Form.Label>
          <Form.Control size="lg" type="time" placeholder="Duration time" step="1" {...register("duration_time", {required: true})} />
          {errors.duration_time && (
            <p style={{color:"red"}}>This field is required</p>
        )}
      </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Dish type</Form.Label>
          <Form.Control size="lg" as="select" name="dishSelect" id="dishSelect"  {...register("dishSelect", { required: true })}>
              <option value="pizza">pizza</option>
              <option value="soup"> soup</option>
              <option value="sandwich"> sandwich</option>
          </Form.Control>
          {errors.dishSelect && (
            <p style={{color:"red"}}>This field is required</p>
        )}
        </Form.Group>
      </Form.Row>
      <Form.Row>
      {selectValue === "pizza" && (
       <Form.Group>
        <Form.Group controlId="no_of_slices">
        <Form.Label>Number of slices</Form.Label>
        <Form.Control size="lg" type="number" placeholder="number of slices" {...register("no_of_slices", {required: true, min: 0})} />
        </Form.Group>
        {errors.no_of_slices && (
            <p style={{color:"red"}}>This field is required</p>
        )}
        <Form.Group  controlId="diameter">
        <Form.Label>Diameter</Form.Label>
        <Form.Control size="lg" type="number" placeholder="Diameter" step="0.1" {...register("diameter", {required: true, min: 0})} />
        {errors.diameter && (
            <p style={{color:"red"}}>This field is required</p>
        )}
        </Form.Group>
      </Form.Group>
      )}
      </Form.Row>      
      {selectValue === "soup" && (
        <Form.Row>
          <Form.Group>
            <Form.Label>Spiceness scale </Form.Label>
            <Form.Control size="lg" type="number" placeholder="spiceness scale" min="1" max="10" step="1" {...register("spiceness_scale", {required: true, min: 0})} />
            {errors.spiceness_scale && (
            <p style={{color:"red"}}>This field is required</p>
        )}
          </Form.Group>
        </Form.Row>
      )}
      {selectValue === "sandwich" && (
        <Form.Row>
        <Form.Group>
          <Form.Label>Slices of Bread</Form.Label>
          <Form.Control size="lg" type="number" placeholder="slice of bread" min="0" {...register("slice_of_bread", {required: true, min: 0})} />
          {errors.slice_of_bread && (
            <p style={{color:"red"}}>This field is required</p>
        )}
        </Form.Group>
      </Form.Row>
      )}
      <Form.Row>
      <Form.Group>
        <Button variant="primary" type="submit"   >
          Submit
        </Button>
        </Form.Group>
        <Form.Group>
        {loading ? <Spinner animation="border" variant="primary" /> : null}
        </Form.Group>         
      </Form.Row>
      {postError ? <p style={{color:"red"}}>The form could not be submitted</p> : null}
      {succes ? <p style={{color:"green"}} >The form submitted sucesfully</p>: null }
      
    </Form>
    
  );
}