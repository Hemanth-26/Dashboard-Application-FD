import { ListItem as MuiListItem } from "@mui/material";
import { styled } from "@mui/material/styles";

const MyStyledListItem = styled(MuiListItem)`
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
  background-color: #efeeee !important;
`;

const TodoListItem = (props) => <MyStyledListItem {...props} />;

export default TodoListItem;
