import { Grid } from "@mui/material";
import PagesButton from "./childs/PagesButton";
import UserSalesPerQuantity from "./childs/UserSalesPerQuantity";
import UserSalesPerAmount from "./childs/UserSalesPerAmount";

const Dashboard = () => {
  return (
    <>
      <PagesButton />
      <br />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ sm: 12, md: 6 }}>
          <UserSalesPerQuantity />
        </Grid>
        <Grid size={{ sm: 12, md: 6 }}>
          <UserSalesPerAmount />
        </Grid>
      </Grid>
      <br />
    </>
  );
};

export default Dashboard;
