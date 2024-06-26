"use client";
import PerilTabs from "@/components/PerilTabs";
import { MainNav } from "@/components/main-nav";
const perilCategories = [
  "bushfire",
  "cyclone",
  "earthquake",
  "flood",
  "stormhail",
];

export default function DashboardPage() {
  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Peril Risk Pricing Dashboard
            </h2>
          </div>
          <PerilTabs perilCategories={perilCategories} />
        </div>
      </div>
    </>
  );
}
