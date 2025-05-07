import React from "react";
import { Card, CardContent } from "../ui/card";

const OverviewCard = ({ title, value }) => {
  return (
    <Card className="w-full shadow-md rounded-2xl h-28 flex items-center justify-center">
      <CardContent className="flex flex-col text-center items-center justify-center p-4">
        <h4 className="text-lg font-medium leading-tight">{title}</h4>
        <p className="text-2xl font-bold text-blue-600 leading-tight">
          {value}
        </p>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
