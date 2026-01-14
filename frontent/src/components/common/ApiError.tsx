import { Alert, Grid } from "@mui/material";

const ApiError = ({ apiError }: { apiError: string | any }) => {
  return (
    <Grid marginTop={2}>
      <Alert severity="error" sx={{ width: "400px" }}>
        {apiError}
      </Alert>
    </Grid>
  );
};

export default ApiError;
