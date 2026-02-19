import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router";

export default function InventoryDashboard() {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      {/* <DashboardHeader
        logo={<SitemarkIcon />}
        title=""
        menuOpen={isNavigationExpanded}
        onToggleMenu={handleToggleHeaderMenu}
      />
      <DashboardSidebar
        expanded={isNavigationExpanded}
        setExpanded={setIsNavigationExpanded}
        container={layoutRef?.current ?? undefined}
      /> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
        }}
      >
        <Toolbar sx={{ displayPrint: "none" }} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
