import { React, useContext } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import {AuthContext} from '../state/AuthContext';

const initialValues = {
    name:        "",
    email:       "",
    password:    "",
    city:        "",
    state:       "",
    country:     "",
    occupation:  "",
    phoneNumber: "",
};


const userScheme = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().email("Invaild email").required("Required"),
    phoneNumber: yup.number().typeError("Enter valid Phone number").required("Required"),
    city: yup.string().required("Required"),
    state: yup.string().required("Required"),
    country: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    password: yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("Required"),
});


const Signup = (props) => {    
    const authContext = useContext(AuthContext);
    const register = async (values) => {
        const savedUserResponse = await fetch(
          "http://localhost:5001/auth/register",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
                city: values.city,
                state: values.state,
                country: values.country,
                occupation: values.occupation,
                phoneNumber: values.phoneNumber,
            }),
          }
        );
        const savedUser = await savedUserResponse.json();

        if (savedUser) {
            let email = values.email;
            let id = '63701cc1f03239c72c00017f';
            localStorage.setItem('email', email);
            localStorage.setItem('id', id);
            authContext.setAuth({email, id});
        }
      };

    // const addNewUser = (values) => {
    //     const id = "63701cc1f03239c72c000181";
    //     const email = "oveneur2@marketwatch.com";
    //     console.log(values)
    //     localStorage.setItem('email', email);
    //     localStorage.setItem('id', id);
    //     authContext.setAuth({email, id});
    // };

    return (
        <Grid>
            <Paper elevation={10} style={{ padding: 20, width: 500, margin: "90px auto", justifyContent: "sapce-between" }}>
                <Grid align='center'>
                    <Avatar style={{ backgroundColor: '#1bbd7e' }}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={{ margin: 0 }}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={userScheme} onSubmit={ async(values) => {await register(values)} }>
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <TextField 
                                fullWidth
                                type="text"
                                label="Name"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Name}
                                name="name"
                                error={props.touched.Name && props.errors.Name}
                                helperText={props.touched.Name && props.errors.Name}
                                sx={{ gridColumn: "span 2" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="Email"
                                onBlur={props.handleBlur}
                                value={props.values.Email}
                                name="email"
                                error={props.touched.Email && props.errors.Email}
                                helperText={props.touched.Email && props.errors.Email}
                                sx={{ gridColumn: "span 4" }} 
                                onChange={props.handleChange} />
                            <TextField fullWidth
                                type="Password"
                                label="Password"
                                onBlur={props.handleBlur}
                                value={props.values.Password}
                                name="password"
                                error={props.touched.Password && props.errors.Password}
                                helperText={props.touched.Password && props.errors.Password}
                                sx={{ gridColumn: "span 4" }} 
                                onChange={props.handleChange}/>
                            <TextField 
                                fullWidth
                                type="text"
                                label="City"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.City}
                                name="city"
                                error={props.touched.City && props.errors.City}
                                helperText={props.touched.City && props.errors.City}
                                sx={{ gridColumn: "span 4" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="State"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.State}
                                name="state"
                                error={props.touched.State && props.errors.State}
                                helperText={props.touched.State && props.errors.State}
                                sx={{ gridColumn: "span 4" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="Country"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Country}
                                name="country"
                                error={props.touched.Country && props.errors.Country}
                                helperText={props.touched.Country && props.errors.Country}
                                sx={{ gridColumn: "span 4" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="Occupation"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Occupation}
                                name="occupation"
                                error={props.touched.Occupation && props.errors.Occupation}
                                helperText={props.touched.Occupation && props.errors.Occupation}
                                sx={{ gridColumn: "span 4" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="Contact Number"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Contact}
                                name="phoneNumber"
                                error={props.touched.Contact && props.errors.Contact}
                                helperText={props.touched.Contact && props.errors.Contact}
                                sx={{ gridColumn: "span 4" }} />
                            <Button type='submit' variant='contained' color='primary' style={{marginBottom: 10, marginTop: 10}}>Sign up</Button>
                        </form>
                    )}
                </Formik>
                <Typography > Already have an acoount ?
                    <Link href="#" onClick={() => props.onFormSwitch('login')}> Sign in </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;