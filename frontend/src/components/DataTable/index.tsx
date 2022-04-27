import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

type DataTableColumnProps = {
  id?: string;
  key: string;
  label: string;
  align?: "right" | "left" | "center";
  render?: (value: any, row: Record<string, any>) => React.Component;
  minWidth?: number;
};

type DataTableProps = {
  title: string;
  columns: Array<DataTableColumnProps>;
  rows: Array<Record<string, any>>;
  TableActions?: React.ReactElement;
};

const NoDataDisplay = styled(Box)({
  padding: "20px",
  maxHeight: "400px",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  TableActions,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {TableActions}
      <TableContainer
        component={Paper}
        style={{
          height: "100%",
          padding: "0 20px",
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label={title} stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id || column.key}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="subtitle1">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell align="center" colSpan={columns.length}>
                  <NoDataDisplay>No data</NoDataDisplay>
                </TableCell>
              </TableRow>
            ) : (
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column, i) => {
                        const value = row[column.key];
                        return (
                          <TableCell
                            key={`row:${column.id || column.key}:${i}`}
                            align={column.align || "left"}
                          >
                            {column.render ? column.render(value, row) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;
