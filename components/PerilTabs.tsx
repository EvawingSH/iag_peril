import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import BarChart from "./BarChart";

// Define the interface for component props
interface PerilTabsProps {
  perilCategories: string[];
}

const PerilTabs: React.FC<PerilTabsProps> = ({ perilCategories }) => {
  if (!Array.isArray(perilCategories) || perilCategories.length === 0) {
    console.error(
      "Expected perilCategories to be a non-empty array, received:",
      perilCategories,
    );
    return <p>Error: Invalid data format or empty data.</p>;
  }

  return (
    <div>
      <Tabs defaultValue={perilCategories[0]} className="space-y-4">
        <TabsList>
          {perilCategories.map((perilCategory) => (
            <TabsTrigger key={perilCategory} value={perilCategory}>
              {perilCategory.charAt(0).toUpperCase() + perilCategory.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {perilCategories.map((perilCategory) => (
          <TabsContent
            key={perilCategory}
            value={perilCategory}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>
                    {perilCategory.charAt(0).toUpperCase() +
                      perilCategory.slice(1)}{" "}
                    technical premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <BarChart perilCategory={perilCategory} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PerilTabs;
