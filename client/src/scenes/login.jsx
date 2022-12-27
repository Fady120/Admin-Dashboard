import { React, useContext } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {AuthContext} from '../state/AuthContext';
import { Formik } from "formik";
import * as yup from "yup";
import { useGetUserByRoleQuery } from "state/api";  

const initialValues = {
  Email:     "",
  Password:  "",
};

const userScheme = yup.object().shape({
  Email: yup.string().email("Invaild email").required("Required"),
  Password: yup.string()
            .min(8, 'Password must be 8 characters long')
            .matches(/[0-9]/, 'Password requires a number')
            .matches(/[a-z]/, 'Password requires a lowercase letter')
            .matches(/[A-Z]/, 'Password requires an uppercase letter')
            .matches(/[^\w]/, 'Password requires a symbol')
            .required("Required"),
});

const Login=(props)=>{
  const authContext = useContext(AuthContext);
  const { data, isLoading } = useGetUserByRoleQuery();
  
  return(
    isLoading ? <>Loading..</> :
    <Grid>
      <Paper elevation={10} style={{padding :20,width:500, margin:"90px auto"}}>
        <Grid align='center'>
          <Avatar style={{backgroundColor:'#1bbd7e'}}><LockOutlinedIcon/></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik initialValues={initialValues}
                validationSchema={userScheme} 
                onSubmit={(values) => {
                  let flag = 0;
                  for(let i=0;i<data.length;i++) {
                    if(values.Password === data[i].password && values.Email === data[i].email) {
                      const id = data[i]._id;
                      const email = values.Email;
                      localStorage.setItem('email', email);
                      localStorage.setItem('id', id);
                      authContext.setAuth({email, id});
                      flag = 1;
                      break;
                    }   
                  }
                  if(flag === 0) {
                    alert("Email or Password is wrong");
                  }
                }}>
          {(props) => (
            <form>
              <TextField 
                fullWidth
                type="text"
                label="Email"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.Email}
                name="Email"
                error={props.touched.Email && props.errors.Email}
                helperText={props.touched.Email && props.errors.Email}
                sx={{ gridColumn: "span 4" }} />
              <TextField 
                fullWidth
                type="password"
                label="Password"
                onBlur={props.handleBlur}
                onChange={props.handleChange}
                value={props.values.Password}
                name="Password"
                error={props.touched.Password && props.errors.Password}
                helperText={props.touched.Password && props.errors.Password}
                sx={{ gridColumn: "span 4" }} />
              <Button type='submit' color='primary' variant="contained" style={{margin:'8px 0'}} fullWidth onClick={props.handleSubmit}>Sign in</Button>
            </form>
          )}
        </Formik>
        <Typography > Don't you have an account ?
          <Link href="#" onClick={() => props.onFormSwitch('register')}> Sign up </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login;