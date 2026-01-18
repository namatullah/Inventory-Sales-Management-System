import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { getUserQuantitySale } from "../../../../lib/report";
import { COLORS, monthNames } from "../../../../helpers/helper";

const SalesPerQuantity = ({
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
      const { data } = await getUserQuantitySale();

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
      <CardContent>
        <h3>
          Sale quantity per Sellers, for the current month(
          {monthNames[currentMonth]} - {currentYear}):
        </h3>
        <PieChart width={400} height={400}>
          <Pie
            activeShape={{
              fill: "red",
            }}
            data={data}
            dataKey="totalItemsSold"
            isAnimationActive={isAnimationActive}
            outerRadius={150}
          >
            {data &&
              data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
          <Tooltip defaultIndex={2} />
        </PieChart>
      </CardContent>
    </Card>
  );
};
export default SalesPerQuantity;
