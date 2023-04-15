import React from "react";
import Grid from "@mui/material/Grid";
import IconCard from "./icon-card";
import TodoIcon from "../../assets/images/cards/todo_icon.svg";
import TodoCompleted from "../../assets/images/cards/todo_completed.svg";

function dashboardCard({ dahboardCard }) {
  const cardData = [
    {
      title: "Todo Pending",
      icon: TodoIcon,
      value: dahboardCard?.active_todo || 0,
      routeUrl: "/getTodos",
    },
    {
      title: "Todo Completed",
      icon: TodoCompleted,
      value: dahboardCard?.completed_todo || 0,
      routeUrl: "/getTodos",
    },
  ];

  return cardData.map((item) => (
    <Grid item xs={12} md={6} key={item.title}>
      <IconCard {...item} />
    </Grid>
  ));
}

export default dashboardCard;
