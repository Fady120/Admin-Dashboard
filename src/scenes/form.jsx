import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../shared components/Header";

const initialValues = {
    FirstName: "",
    LastName:  "",
    Email:     "",
    Contact:   "",
    Address1:  "",
    Address2:  ""
};

const phoneRegExp =  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userScheme = yup.object().shape({
    FirstName: yup.string().required("Required"),
    LastName: yup.string().required("Required"),
    Email: yup.string().email("Invaild email").required("Required"),
    Contact: yup.string().matches(phoneRegExp,"Phone number isn't vaild").required("Required"),
    Address1: yup.string().required("Required"),
    Address2: yup.string().required("Required")
});

const Form = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const handleFormSubmit = (values) => console.log(values);

    return (
        <Box margin="20px">
            <Header title="Create User" subtitle="Create a New User Profile"/>

            <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userScheme}>
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
                    <from onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,(0, 1fr))" sx={{"& > div": {gridColumn: isNonMobile ? undefined : "span 4"} }}>
                             <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.FirstName}
                                name="FirstName"
                                error={touched.FirstName && errors.FirstName}
                                helperText={touched.FirstName && errors.FirstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.LastName}
                                name="LastName"
                                error={touched.LastName && errors.LastName}
                                helperText={touched.LastName && errors.LastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Email}
                                name="Email"
                                error={touched.Email && errors.Email}
                                helperText={touched.Email && errors.Email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Contact Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Contact}
                                name="Contact"
                                error={touched.Contact && errors.Contact}
                                helperText={touched.Contact && errors.Contact}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address 1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Address1}
                                name="Address1"
                                error={touched.Address1 && errors.Address1}
                                helperText={touched.Address1 && errors.Address1}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address 2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.Address2}
                                name="Address2"
                                error={touched.Address2 && errors.Address2}
                                helperText={touched.Address2 && errors.Address2}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box marginTop="20px">
                            <Button type="submit" color="secondary" variant="contained" > Create New User </Button>
                        </Box>
                        <Box marginTop="20px">
                           <Button type="reset" color="secondary" variant="contained" onClick={resetForm}> Cancel </Button>
                        </Box>
                    </from>
                )}
            </Formik>
        </Box>
    )
};

export default Form;