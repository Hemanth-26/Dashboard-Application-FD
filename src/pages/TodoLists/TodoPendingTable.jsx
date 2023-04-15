import React, { useState } from "react";
import moment from "moment";
import { TableFooter, TablePagination } from "@mui/material";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "../../components/index";

function TodoPendingTable({ columns, todoLists }) {
  let todoListData =
    todoLists?.length > 0
      ? todoLists?.filter((todo) => todo.todoStatus === true)
      : [];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table stickyHeader aria-label="todo pending table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sx={{ backgroundColor: "#E98074", color: "#fff" }}
                align={column.align}
                // style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {todoListData?.length > 0 ? (
            todoListData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow>
                  <TableCell align="center" variant="body">
                    {item?.date ? moment(item.date).format("DD-MM-YYYY") : "-"}
                  </TableCell>
                  <TableCell align="center" variant="body">
                    {item?.todoMsg || "-"}
                  </TableCell>
                  <TableCell align="center" variant="body">
                    {item?.todoStatus ? "Pending" : "-"}
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center" variant="body">
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {todoListData?.length > 0 && (
          <TableFooter>
            <TableRow>
              <TablePagination
                color="#E98074"
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: todoListData?.length },
                ]}
                colSpan={3}
                count={todoListData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                className="text-primary"
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                    style: { color: "#E98074" },
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}

export default TodoPendingTable;
