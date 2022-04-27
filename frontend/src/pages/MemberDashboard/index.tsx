import { Grid } from "@mui/material";
import React from "react";
import Page from "../../components/Page";
import MemberBikesWidget from "./Widgets/MemberBikesWidget";
import MemberReservationsWidget from "./Widgets/MemberReservationsWidget";

type MemberDashboardProps = React.FC<any>;

const MemberDashboard: MemberDashboardProps = (props) => {
  return (
    <Page pageTitle="Member Dashboard">
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} sm={12}>
          <MemberBikesWidget />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <MemberReservationsWidget />
        </Grid>
      </Grid>
    </Page>
  );
};

export default MemberDashboard;
