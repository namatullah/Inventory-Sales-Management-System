import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getUserSalesPerAmount } from "../../../../lib/report";
import { COLORS, getColor, monthNames } from "../../../../helpers/helper";

const UserSalesPerAmount = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const [data, setData] =
    useState<[{ name: string; totalItemsSold: number }]>();

  const fetchUserQuantitySale = async () => {
    try {
      const { data } = await getUserSalesPerAmount();
      console.log(data);
      const chartData = data.map((item: any) => ({
        name: item.sellerName,
        value: item.totalAmount,
      }));
      setData(chartData);
    } catch (error) {
      console.log(error);
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
        <br />
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

          <Bar dataKey="value" name="Total Sales">
            {data &&
              data.map((entry, index) => (
                <Cell key={entry.name} fill={getColor(index)} />
              ))}
          </Bar>
        </BarChart>
      </CardContent>
    </Card>
  );
};
export default UserSalesPerAmount;
