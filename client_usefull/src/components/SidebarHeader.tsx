import styled from "@emotion/styled";
import React from "react";
import { Typography } from "./Typography";
import { StyledLogo } from "./StyledLogo";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  collapsed?: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  // children,
  ...rest
}) => {
  const { collapsed, setCollapsed } = rest;
  const handleClickOnExtendedSidebar = () => setCollapsed(true);

  return (
    <StyledSidebarHeader {...rest}>
      <div className="flex items-center">
        <StyledLogo className="bg-primary">U</StyledLogo>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          className="text-primary"
        >
          Usefull
        </Typography>
      </div>
      {!collapsed && (
        <ArrowCircleLeftOutlinedIcon
          fontSize="large"
          className="text-primary cursor-pointer"
          onClick={handleClickOnExtendedSidebar}
        />
      )}
    </StyledSidebarHeader>
  );
};
