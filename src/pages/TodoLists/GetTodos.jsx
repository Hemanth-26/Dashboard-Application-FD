import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import { Grid, Card, HeaderTitle } from "../../components/index";
import TodoPendingTable from "./TodoPendingTable";
import TodoCompletedTable from "./TodoCompletedTable";
import "./GetTodos.scss";

const columns = [
  { id: "date", label: "Date", align: "center", minWidth: 170 },
  { id: "todoMsg", label: "Todo Message", align: "center", minWidth: 100 },
  { id: "todoStatus", label: "Todo Status", align: "center", minWidth: 100 },
];

function GetTodos() {
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [todoLists, setTodoLists] = useState();

  useEffect(() => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.getAllTodos()
      .then((response) => {
        // console.log(response);
        storeHandler(actions.SHOW_LOADER, false);
        setTodoLists(response);
      })
      .catch((error) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(error.data.message, { variant: "error" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HeaderTitle title="Todo Lists" />
      <Grid item xs={12}>
        <Card variant="outlined">
          <div className="todoList-con p-3">
            <div className="todoList-title">
              <h2 className="">Pending</h2>
              <TodoPendingTable columns={columns} todoLists={todoLists} />
            </div>
          </div>
        </Card>
      </Grid>

      <Grid item xs={12} className="my-4 pb-4">
        <Card variant="outlined">
          <div className="todoList-con p-3">
            <div className="todoList-title">
              <h2 className="">Completed</h2>
              <TodoCompletedTable columns={columns} todoLists={todoLists} />
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  );
}

export default GetTodos;
