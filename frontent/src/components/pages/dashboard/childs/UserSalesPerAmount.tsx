import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Tooltip, XAxis, YAxis } from "recharts";
import { getUserSalesPerAmount } from "../../../../lib/report";
import { getColor, monthNames } from "../../../../helpers/helper";
import ApiError from "../../../common/ApiError";

const UserSalesPerAmount = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const [apiError, setApiError] = useState<string>("");

  const [data, setData] =
    useState<[{ name: string; totalItemsSold: number }]>();

  const fetchUserQuantitySale = async () => {
    try {
      const { data } = await getUserSalesPerAmount();
      const chartData = data.map((item: any) => ({
        name: item.sellerName,
        value: item.totalAmount,
      }));
      setData(chartData);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Deletion failed"
      );
    }
  };

  useEffect(() => {
    fetchUserQuantitySale();
  }, []);

  return (
    <Card elevation={2}>
      <CardContent>
        <h4>
          Total Amount sold per Sellers, for the current month(
          {monthNames[currentMonth]} - {currentYear})
        </h4>
        {apiError ? (
          <ApiError apiError={apiError} />
        ) : (
          <>
            <BarChart
              style={{
                width: "100%",
                maxWidth: "800px",
                maxHeight: "80vh",
                aspectRatio: 1.618,
              }}
              responsive
              data={data}
            >
              <XAxis dataKey="name" />
              <YAxis
                label={{
                  value: "Total Sales [Afghani]",
                  position: "insideLeft",
                  dx: 0,
                  dy: 20,
                  angle: -90,
                }}
              />
              <Tooltip />

              <Bar
                dataKey="value"
                name="Total Sales"
                isAnimationActive={isAnimationActive}
              >
                {data &&
                  data.map((entry, index) => (
                    <Cell key={entry.name} fill={getColor(index)} />
                  ))}
              </Bar>
            </BarChart>
            <br />
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default UserSalesPerAmount;
