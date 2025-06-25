import React, { useMemo, useState } from "react";
import { Chart } from "react-charts";

export default function CardChart({ title, data, bg, label, dataItem }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = useMemo(() => {
    const years = [];
    for (let year = 2025; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }, [currentYear]);

  const series = useMemo(() => {
    if (!data || data.length === 0) {
      return [
        {
          label: `${label} ${selectedYear}`,
          data: [{ primary: "No Data", secondary: 0 }],
        },
      ];
    }

    return [
      {
        label: `${label} ${selectedYear}`,
        data: data.map((item) => ({
          primary: item.month,
          secondary: Number(item[dataItem]),
        })),
      },
    ];
  }, [data, selectedYear, dataItem]);

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
        elementType: "line",
      },
    ],
    []
  );

  return (
    <div
      className={`w-full bg-[#FFEDF3] px-[20px] py-[16px] ${bg} rounded-[14px] flex flex-col gap-5`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[10px] font-Poppins font-semibold sm:text-[12px] lg:text-[14px]">
          {title}
        </h1>
        <select
          className="text-[12px] px-2 py-1 border border-gray-300 outline-none rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year} className="">
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-[100px] md:h-full">
        <Chart
          className="font-Poppins font-bold"
          options={{
            data: series,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </div>
    </div>
  );
}
