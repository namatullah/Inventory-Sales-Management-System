import {
  CategoryOutlined,
  Inventory2Outlined,
  PeopleOutline,
  SellOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { Button, Card, CardContent } from "@mui/material";
const PagesButton = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  return (
    <Card elevation={3}>
      <CardContent>
        <Button
          variant="outlined"
          onClick={() => navigate("/sales")}
          startIcon={<SellOutlined />}
          sx={{ mx: 1 }}
        >
          <span style={{ paddingTop: "inherit" }}>sales</span>
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/product")}
          startIcon={<Inventory2Outlined />}
          sx={{ mx: 1 }}
        >
          <span style={{ paddingTop: "inherit" }}>products</span>
        </Button>

        <Button
          disabled={!isAdmin}
          variant="outlined"
          onClick={() => navigate("/category")}
          startIcon={<CategoryOutlined />}
          sx={{ mx: 1 }}
        >
          <span style={{ paddingTop: "inherit" }}>Categories</span>
        </Button>

        <Button
          disabled={!isAdmin}
          variant="outlined"
          onClick={() => navigate("/users")}
          startIcon={<PeopleOutline />}
          sx={{ mx: 1 }}
        >
          <span style={{ paddingTop: "inherit" }}>users</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PagesButton;
