import { useSnackbar } from "notistack";

const Snackbar = ({message, variant}) => {
  const { enqueueSnackbar } = useSnackbar();

//   console.log(message, variant);
  enqueueSnackbar(message, {variant: variant});
}

export default Snackbar;
