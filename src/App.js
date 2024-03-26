import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {Formik,Form,Field,ErrorMessage} from "formik";
import * as Yup from "yup";

function App() {
  const [data,setData] =useState({
      first_name :"",
      last_name:"",
      email: "",
      password: ""
    });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) =>{
    console.log("Form submitted", formData)
  }


  const handleNextStep = (newData,final = false) =>{
    setData(prev=> ({...prev,...newData}))

    if(final){
      makeRequest(newData)
      return
    }
    setCurrentStep(prev => prev+1)
  }


  
  const handlePrevStep = (newData)=>{
    setData(prev=> ({...prev,...newData}))
    setCurrentStep(prev => prev-1)
  }

  const steps = [
    <StepOne next={handleNextStep} data = {data}/>,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data = {data}/>]
  

  return (
    <div className="App">
      {steps[currentStep]}
    </div>
  );
}

const stepOneValidationSchema = Yup.object({
  first_name: Yup.string().required().label("First name"),
  last_name: Yup.string().required().label("Last Name"),
})

const stepTwoValidationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
})

const StepOne = (props) =>{

  const handleSubmit=  (values) =>{
  props.next(values)

  }
  return <Formik validationSchema = {stepOneValidationSchema}
  initialValues = {props.data}
  onSubmit = {handleSubmit}
  >
    {(formikProps)=>
    <Form>
      <p>First Name</p> 
      <Field name="first_name"/>
      <ErrorMessage name ="first_name"/>
      <p>Last Name</p>
      <Field name="last_name"/>

      <ErrorMessage name ="last_name"/>

      <button type="submit">Next</button>
      </Form>}
  </Formik>
}

const StepTwo = (props) =>{
  const handleSubmit=  (values) =>{
  props.next(values,true)}
  return (
  <Formik
  validationSchema={stepTwoValidationSchema}
  initialValues={props.data}
  onSubmit = {handleSubmit}>
    {({values})=>
    <Form>
      <p>Email</p> 
      <Field name="email"/>
      <ErrorMessage name ="email"/>
      <p>Password</p>
      <Field name="password" type="password"/>
      <ErrorMessage name ="password"/>
      <button type="button" onClick={() => props.prev(values)}>Back</button>

      <button type="submit">Submit</button>
      </Form>}
  </Formik>

)}
export default App;
