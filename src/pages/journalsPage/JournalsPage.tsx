import React from 'react';
import SideNavbar from "../../components/Sidenavbar/SideNavbar";
import {Container} from "@mui/material";

const JournalsPage = () => {
  return (
    <SideNavbar panelTitle={"Journals"}>
      <Container>
        Journals
      </Container>
    </SideNavbar>
  );
};

export default JournalsPage;
