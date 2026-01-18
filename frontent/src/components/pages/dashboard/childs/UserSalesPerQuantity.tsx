import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { getUserSalesPerQuantity } from "../../../../lib/report";
import { COLORS, getColor, monthNames } from "../../../../helpers/helper";

const UserSalesPerQuantity = ({
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
      const { data } = await getUserSalesPerQuantity();

      const chartData = data.map((item: any) => ({
        name: item.sellerName,
        totalItemsSold: item.totalItemsSold,
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
      <CardContent sx={{ alignContent: "center", justifyContent: "center" }}>
        <h4>
          Sale quantity per Sellers, for the current month(
          {monthNames[currentMonth]} - {currentYear})
        </h4>
        <PieChart width={400} height={400}>
          <Pie
            activeShape={{
              fill: "yellow",
            }}
            data={data}
            dataKey="totalItemsSold"
            isAnimationActive={isAnimationActive}
            outerRadius={150}
            name="Quantity"
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={entry.name} fill={getColor(index)} />
              ))}
          </Pie>
          <Tooltip defaultIndex={2} />
        </PieChart>
      </CardContent>
    </Card>
  );
};
export default UserSalesPerQuantity;
