import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./icon-card.scss";

function IconCard({ icon, title, value }) {
  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <div className="card-con">
              <div className="card-icon-con">
                <img alt={title} src={icon} className="card-icon" />
              </div>
              <div className="card-content-con">
                <h3 className="card-val font-weight-semibold ms-3">{value}</h3>
                <p className="text-left card-text font-weight-semibold mb-0 ms-3">
                  {title}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default IconCard;
