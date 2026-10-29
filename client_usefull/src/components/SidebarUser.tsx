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
      // `!` forces our border color over the lib's default (#efefef)
      className={`${collapsed && "cursor-pointer"} !fixed overflow-y-scroll top-0 bottom-0 bg-base-100 !border-base-300`}
      // CSS value expected here, not a Tailwind class: let bg-base-100 show through
      backgroundColor="transparent"
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
