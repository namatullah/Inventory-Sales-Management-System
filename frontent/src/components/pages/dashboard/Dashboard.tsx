import {
  Grid,
} from "@mui/material";
import PagesButton from "./childs/PagesButton";
import ProductSale from "./childs/SalesPerQuantity";
import SalesPerQuantity from "./childs/SalesPerQuantity";

const Dashboard = () => {
  return (
    <>
      <PagesButton />
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ sm: 12, md: 6 }}>
          <SalesPerQuantity />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <ProductSale />
        </Grid>
      </Grid>
      <br />
    </>
  );
};

export default Dashboard;
