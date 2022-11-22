import { Box } from "@mui/material";
import Header from "../shared components/Header";
import PieChart from "../shared components/PieChart";

const Pie = () => {
    return (
        <Box margin="20px">
            <Header title="Pie Chart" subtitle="Simple Pie Chart" />
            <Box height="75vh"> <PieChart /> </Box> 
        </Box>
    );
};

export default Pie;