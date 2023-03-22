import { List as MuiList } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyStyledList = styled(MuiList)`
  margin: 0 0.2rem !important;
  border-radius: 0.5rem !important;
`;

const TodoList = (props) => <MyStyledList {...props} />;

export default TodoList;
