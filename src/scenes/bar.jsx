import { Box } from "@mui/material";
import Header from "../shared components/Header";
import BarChart from "../shared components/BarChart";

const Bar = () =>{
    return (
        <Box margin="20px">
            <Header title="Bar Chart" subtitle="Simple BAr Chart" />
            <Box height="75vh"> <BarChart /> </Box>
        </Box>
    );
};

export default Bar;