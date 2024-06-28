import {
  BsPlugin,
  CiDollar,
  CiSettings,
  RiGitRepositoryCommitsLine,
  RxDashboard,
  TbReportSearch,
} from "@prima/external/react-icon";

export const SIDEBAR_MENU_LINK = [
  { href: "/dashboard", icon: RxDashboard, label: "Dashboard" },
  {
    href: "/dashboard/repository",
    icon: RiGitRepositoryCommitsLine,
    label: "Repository",
  },
  {
    href: "/dashboard/integrations",
    icon: BsPlugin,
    label: "Integrations",
  },
  {
    href: "/dashboard/reports",
    icon: TbReportSearch,
    label: "Reports",
  },
  {
    href: "/dashboard/settings",
    icon: CiSettings,
    label: "Settings",
  },
  {
    href: "/dashboard/subscription",
    icon: CiDollar,
    label: "Subscription",
  },
];
