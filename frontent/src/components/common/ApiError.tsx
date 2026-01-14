import { Alert, Grid } from "@mui/material";

const ApiError = ({ apiError }: { apiError: string | any }) => {
  return (
    <Grid marginTop={2}>
      <Alert severity="error">{apiError}</Alert>
    </Grid>
  );
};

export default ApiError;
