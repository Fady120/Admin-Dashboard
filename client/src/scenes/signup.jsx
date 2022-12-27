import { React, useContext } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button, Link } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Formik } from "formik";
import * as yup from "yup";
import {AuthContext} from '../state/AuthContext';

const initialValues = {
    Name:       "",
    Email:      "",
    Password:   "",
    Contact:    "",
    City:       "",
    State:      "",
    Country:    "",
    Occupation: "",
};


const userScheme = yup.object().shape({
    Name: yup.string().required("Required"),
    Email: yup.string().email("Invaild email").required("Required"),
    Contact: yup.number().typeError("Enter valid Phone number").required("Required"),
    City: yup.string().required("Required"),
    State: yup.string().required("Required"),
    Country: yup.string().required("Required"),
    Occupation: yup.string().required("Required"),
    Password: yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required("Required"),
});

const Signup = (props) => {    
    const authContext = useContext(AuthContext);

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
                <Formik initialValues={initialValues} 
                        validationSchema={userScheme}
                        onSubmit={(values) => {
                            const id = "63701cc1f03239c72c000181";
                            const email = "oveneur2@marketwatch.com";
                            localStorage.setItem('email', email);
                            localStorage.setItem('id', id);
                            authContext.setAuth({email, id});
                        }}>
                    {(props) => (
                        <form>
                            <TextField 
                                fullWidth
                                type="text"
                                label="Name"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Name}
                                name="Name"
                                error={props.touched.Name && props.errors.Name}
                                helperText={props.touched.Name && props.errors.Name}
                                sx={{ gridColumn: "span 2" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="Email"
                                onBlur={props.handleBlur}
                                value={props.values.Email}
                                name="Email"
                                error={props.touched.Email && props.errors.Email}
                                helperText={props.touched.Email && props.errors.Email}
                                sx={{ gridColumn: "span 4" }} 
                                onChange={props.handleChange} />
                            <TextField fullWidth
                                type="Password"
                                label="Password"
                                onBlur={props.handleBlur}
                                value={props.values.Password}
                                name="Password"
                                error={props.touched.Password && props.errors.Password}
                                helperText={props.touched.Password && props.errors.Password}
                                sx={{ gridColumn: "span 4" }} 
                                onChange={props.handleChange}/>
                            <TextField 
                                fullWidth
                                type="text"
                                label="Contact Number"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.Contact}
                                name="Contact"
                                error={props.touched.Contact && props.errors.Contact}
                                helperText={props.touched.Contact && props.errors.Contact}
                                sx={{ gridColumn: "span 4" }} />
                            <TextField 
                                fullWidth
                                type="text"
                                label="City"
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                                value={props.values.City}
                                name="City"
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
                                name="State"
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
                                name="Country"
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
                                name="Occupation"
                                error={props.touched.Occupation && props.errors.Occupation}
                                helperText={props.touched.Occupation && props.errors.Occupation}
                                sx={{ gridColumn: "span 4" }} />
                            <Button type='submit' variant='contained' color='primary' style={{marginBottom: 10, marginTop: 10}} onClick={props.handleSubmit}>Sign up</Button>
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