import React, { useState, useEffect, useContext } from "react";
import { useSnackbar } from "notistack";
import { GlobalContext, actions } from "../../context";
import AuthServices from "../../api/services/auth-services";
import {
  Grid,
  HeaderTitle,
  MonthlyGraph,
  DashboardCard,
} from "../../components/index";

function Dashboard() {
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(GlobalContext);
  const storeHandler = (type, payload) => dispatch({ type, payload });

  const [dashData, setDashData] = useState();
  console.log("dashData", dashData);

  useEffect(() => {
    storeHandler(actions.SHOW_LOADER, true);
    AuthServices.dashboard()
      .then((response) => {
        console.log(response);
        storeHandler(actions.SHOW_LOADER, false);
        setDashData(response);
      })
      .catch((error) => {
        storeHandler(actions.SHOW_LOADER, false);
        enqueueSnackbar(error.data.message, { variant: "error" });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HeaderTitle title="Dashboard" />
      <Grid container spacing={2}>
        <DashboardCard dahboardCard={dashData} />
        <Grid item xs={12}>
          <MonthlyGraph dashboardGraph={dashData} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
