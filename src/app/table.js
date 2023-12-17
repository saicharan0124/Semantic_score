import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function DynamicTable({ headers, data }) {
    const headersArray = Object.values(headers);
    const dataArray = Object.values(data);
  return (
    <Table>

      <TableHeader>
        <TableRow>
          {headersArray.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataArray.slice(1).map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell
                key={cellIndex}
                className={cellIndex === 0 ? "font-medium" : ""}
              >
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
 
    </Table>
  );
}
