import styled from "@emotion/styled";
import React from "react";
import { Typography } from "./Typography";
import { StyledLogo } from "./StyledLogo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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
  collapsed,
  setCollapsed,
  // Only real HTML attributes (className…) are left in rest, safe to spread on the div
  ...rest
}) => {
  const handleClickOnExtendedSidebar = () => setCollapsed(true);

  return (
    <StyledSidebarHeader {...rest}>
      <div className="flex items-center gap-2.5">
        <StyledLogo className="bg-primary text-primary-content">U</StyledLogo>
        <Link to={"/usr/welcome"}>
          <Typography
            variant="body1"
            fontWeight={700}
            className="text-base-content"
          >
            Usefull
          </Typography>
        </Link>
      </div>
      {!collapsed && (
        <button
          className="btn btn-ghost btn-sm btn-square text-base-content/70"
          aria-label="Réduire le menu"
          onClick={handleClickOnExtendedSidebar}
        >
          <ChevronLeftIcon />
        </button>
      )}
    </StyledSidebarHeader>
  );
};
