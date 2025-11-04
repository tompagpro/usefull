import React from "react";
import { Sidebar } from "react-pro-sidebar";
import { SidebarHeader } from "./SidebarHeader";
import { CategoryMenu } from "./CategoryMenu";
import { TagMenu } from "./TagsMenu";

type SidebarUserProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  broken: boolean;
  setBroken: (broken: boolean) => void;
};

export const SidebarUser: React.FC<SidebarUserProps> = ({
  setBroken,
  collapsed,
  setCollapsed,
  toggled,
  setToggled,
}) => {
  const handleClickOnCollapsedSidebar = () => setCollapsed(false);

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
      className={`${collapsed && "cursor-pointer"} !fixed overflow-y-scroll top-0 bottom-0 bg-base-100 border-r border-primary`}
      backgroundColor={"bg-base-100"}
      onClick={collapsed ? handleClickOnCollapsedSidebar : undefined}
    >
      <div className="flex flex-col">
        <SidebarHeader
          className="mt-4 mb-6"
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <div className="flex-1 mb-8">
          <CategoryMenu collapsed={collapsed} />
          <TagMenu collapsed={collapsed} />
        </div>
        {/* <SidebarFooter collapsed={collapsed} /> */}
      </div>
    </Sidebar>
  );
};
