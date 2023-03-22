import { styled } from "@mui/material";
import { SnackbarProvider, MaterialDesignContent } from "notistack";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#2D7738",
    // backgroundColor: "#E98074",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#970C0C",
  },
}));

const snackbarProvider = (props) => (
  <SnackbarProvider
    Components={{
      success: StyledMaterialDesignContent,
      error: StyledMaterialDesignContent,
    }}
    autoHideDuration={2000}
    anchorOrigin={{ horizontal: "right", vertical: "top" }}
    disableWindowBlurListener
    preventDuplicate
    maxSnack={2}
    {...props}
  />
);

export default snackbarProvider;
