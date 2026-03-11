import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar";
import { Box, Container } from "@mui/material";

interface SideMenuProps {
  onSelect: (category: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onSelect }) => {
  return (
    <Sidebar width={"270px"} showProfile={false}>
      <Menu subHeading="MENU">
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("All");
            }}
          >
            All items
          </Box>
        </MenuItem>
      </Menu>
      <Menu subHeading="DRINKS">
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Soft drinks");
            }}
          >
            Soft drinks
          </Box>
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Alcoholic drinks");
            }}
          >
            Alcoholic drinks
          </Box>
        </MenuItem>
      </Menu>
      <Menu subHeading="LIGHT BITES">
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Sandwiches");
            }}
          >
            Sandwiches
          </Box>
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Wraps");
            }}
          >
            Wraps
          </Box>
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Toasties");
            }}
          >
            Toasties
          </Box>
        </MenuItem>
      </Menu>
      <Menu subHeading="SNACKS">
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Sweet Treats");
            }}
          >
            Sweet treats
          </Box>
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Crisps and crackers");
            }}
          >
            Crisps and crackers
          </Box>{" "}
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Kids snack boxes");
            }}
          >
            Kids snack boxes
          </Box>{" "}
        </MenuItem>
      </Menu>
      <Menu subHeading="DUTY FREE">
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect("Perfume");
            }}
          >
            Perfume
          </Box>{" "}
        </MenuItem>
        <MenuItem>
          <Box
            onClick={(e) => {
              e.preventDefault();
              onSelect("Makeup");
            }}
          >
            Make up
          </Box>{" "}
        </MenuItem>
      </Menu>
      <Menu subHeading="PROFILE">
        <MenuItem link="/logout">
          <Box>Log out</Box>{" "}
        </MenuItem>
        <MenuItem link="/profile">
          <Box>My Details</Box>{" "}
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideMenu;
