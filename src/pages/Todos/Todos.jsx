import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";
import { GlobalContext, actions } from "../../context";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AuthServices from "../../api/services/auth-services";
import {
  Card,
  Grid,
  TextField,
  Button,
  TodoList,
  TodoListItem,
  ListItemText,
  IconButton,
  HeaderTitle,
  ResponsiveDatepicker,
  ConfirmTodoDialog,
} from "../../components/index";
import "./Todos.scss";

function Todos() {
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [selectedDate, setSelectedDate] = useState(moment());

  const [addTodoData, setAddTodoData] = useState("");

  const [dialogOpen, setDialogOpen] = useState({ open: false, id: null });

  const [todoData, setTodoData] = useState([]);
  // console.log("todoData", todoData);
  const [todoList, setTodoList] = useState([]);
  // console.log("todoList", todoList);

  const onChangTodoDate = (changedData) => {
    let todo =
      todoData.length > 0
        ? todoData?.filter(
            (list) =>
              moment(list.date).local().format("YYYY-MM-DD") ===
              moment(changedData).local().format("YYYY-MM-DD")
          )
        : [];

    setTodoList(todo);
  };

  const onClickEditTodo = (id) => {
    const editTodoData = todoList.map((todo) =>
      todo?._id === id ? { ...todo, edit: !todo.edit } : todo
    );
    setTodoList(editTodoData);
  };

  const todoUpdateData = (value, id) => {
    const updateTodoData = todoList.map((todo) =>
      todo?._id === id ? { ...todo, todoMsg: value } : todo
    );
    setTodoList(updateTodoData);
  };

  const getTodoLists = () => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.getTodos()
      .then((todos) => {
        let addEditData =
          todos.length > 0
            ? todos.map((item) => ({ ...item, edit: false }))
            : [];
        setTodoData(addEditData);

        let todo =
          addEditData.length > 0
            ? addEditData?.filter(
                (list) =>
                  moment(list.date).local().format("YYYY-MM-DD") ===
                  moment(selectedDate).local().format("YYYY-MM-DD")
              )
            : [];

        setTodoList(todo);

        storeHandler(actions.SHOW_LOADER, false);
      })
      .catch((error) => {
        console.log("error", error);
        storeHandler(actions.SHOW_LOADER, false);
      });
  };

  const addTodoListData = () => {
    if (addTodoData !== "") {
      setAddTodoData("");
      storeHandler(actions.SHOW_LOADER, true);
      let sendData = {
        todoMsg: addTodoData,
        date: moment(selectedDate).format("DD-MM-YYYY"),
      };
      AuthServices.addTodos(sendData)
        .then((response) => {
          storeHandler(actions.SHOW_LOADER, false);
          enqueueSnackbar(response.message, { variant: "success" });
          getTodoLists();
        })
        .catch((error) => {
          storeHandler(actions.SHOW_LOADER, false);
          enqueueSnackbar(error.data.message, { variant: "error" });
        });
    }
  };

  const updateTodoItemData = (id) => {
    const filteredData = todoList.filter((todo) => todo._id === id);
    let sendData = {
      todoMsg: filteredData[0].todoMsg,
    };
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.updateTodo(filteredData[0]._id, sendData)
      .then((response) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(response.message, { variant: "success" });
        getTodoLists();
      })
      .catch((error) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(error.data.message, { variant: "error" });
      });
  };

  const deleteTodoListData = (id) => {
    // console.log("deleteTodoListData", id);
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.removeTodo(id)
      .then((response) => {
        // console.log(response.message);
        setDialogOpen({ open: false });
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(response.message, { variant: "success" });
        getTodoLists();
      })
      .catch((error) => {
        // console.log(error.data.message);
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(error.data.message, { variant: "error" });
      });
  };

  useEffect(() => {
    getTodoLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <HeaderTitle title="Todos" />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} className="mb-3">
            <Card variant="outlined" className="p-4">
              <div className="todo-page-container">
                <div className="todo-date-con">
                  <ResponsiveDatepicker
                    id="Date"
                    label="Enter the Date"
                    color="secondary"
                    // className="required"
                    minDate={moment().subtract(5, "years")}
                    maxDate={moment().add(25, "years")}
                    defaultValue={selectedDate}
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event);
                      onChangTodoDate(event);
                    }}
                  />
                </div>
                <div className="todo-add-con" onSubmit={() => {}}>
                  <TextField
                    // helperText="Please enter your name"
                    id="todo-message"
                    label="Please enter your todo message"
                    className="todo-input mx-3"
                    value={addTodoData}
                    onChange={(e) => setAddTodoData(e.target.value)}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    onClick={addTodoListData}
                  >
                    Add Todo
                  </Button>
                </div>
                <div className="todo-list-con">
                  <h4 className="todo-list-title">
                    {moment(selectedDate).format("DD-MM-YYYY")}
                  </h4>
                  <p className="text-center">Todo Lists</p>
                  <div className="todo-list">
                    <TodoList>
                      {todoList.length > 0 ? (
                        todoList.map((todo) =>
                          todo?.edit ? (
                            <TodoListItem
                              key={todo?._id}
                              dense
                              className="py-3 rounded align-items-stretch justify-content-around"
                            >
                              <TextField
                                // helperText="Please enter your name"
                                id="demo-helper-text-misaligned"
                                label="Please enter todo list message"
                                className="mx-2 my-0 w-75"
                                defaultValue={todo?.todoMsg}
                                onChange={(e) =>
                                  todoUpdateData(e.target.value, todo?._id)
                                }
                              />
                              <Button
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={() => updateTodoItemData(todo._id)}
                              >
                                Update Todo
                              </Button>
                            </TodoListItem>
                          ) : (
                            <TodoListItem
                              key={todo?._id}
                              className="py-4 rounded"
                              secondaryAction={
                                <div>
                                  <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    className="edit-icon-btn"
                                    onClick={() => onClickEditTodo(todo?._id)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    className="delete-icon-btn"
                                    onClick={() =>
                                      setDialogOpen({
                                        open: true,
                                        id: todo?._id,
                                      })
                                    }
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </div>
                              }
                            >
                              <ListItemText
                                primary={todo?.todoMsg}
                                // secondary={secondary ? "Secondary text" : null}
                              />
                            </TodoListItem>
                          )
                        )
                      ) : (
                        <div className="text-center my-3 font-error">
                          Todos not found on selected date
                        </div>
                      )}
                    </TodoList>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
      <ConfirmTodoDialog
        open={dialogOpen}
        handleClose={setDialogOpen}
        handlerConfirm={deleteTodoListData}
        title="Delete Todo List"
        content="If your are deleted Todo item it will consider as Todo completed."
      />
    </>
  );
}

export default Todos;
