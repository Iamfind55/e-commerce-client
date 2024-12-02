"use client";

type tableHeaderProps = {
  columns: React.ReactNode[];
};
export default function HeadTable({ columns }: tableHeaderProps) {
  return (
    <>
      <thead className="sticky top-0  bg-gray text-xs uppercase bg-white">
        <tr className="border-b border-gray text-left">
          {columns?.map((column, index: number) => (
            <th key={index} scope="col" className="py-3 pl-1">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    </>
  );
}
