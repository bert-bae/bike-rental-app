import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

type DataTableProps = {
  title: string;
  headers: Array<string>;
  data: Array<Record<string, any>>;
  dataKeys: Array<string>;
  actions?: Array<{
    text: string;
    action: (input: any) => void;
  }>;
};

const NoDataDisplay = styled(Box)({
  padding: "20px",
  height: "150px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

const DataTable: React.FC<DataTableProps> = ({
  title,
  headers,
  data,
  dataKeys,
  actions,
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
      <TableContainer
        component={Paper}
        style={{
          padding: "0 20px",
          maxHeight: "400px",
          overflowY: "scroll",
        }}
      >
        {data.length === 0 ? (
          <NoDataDisplay>No data</NoDataDisplay>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label={title} stickyHeader>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell>
                    <Typography variant="subtitle1">{header}</Typography>
                  </TableCell>
                ))}
                {actions && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {dataKeys.map((key) => {
                        return <TableCell align="left">{row[key]}</TableCell>;
                      })}
                      {actions && (
                        <TableCell>
                          {actions.map(({ action, text }) => (
                            <Button
                              type="button"
                              variant="outlined"
                              style={{ margin: "5px" }}
                              onClick={() => action(row)}
                            >
                              {text}
                            </Button>
                          ))}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;
