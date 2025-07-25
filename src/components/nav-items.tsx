import { usePathname } from "next/navigation";

export const NavItems = () => {
  function isNavItemActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }
  const pathname = usePathname();
  return [
    {
      name: "Pen",
      icon: "✏️",
      href: "/",
      active: pathname === "/",
      position: "top",
    },
    {
      name: "Knowledge Base",
      href: "/kb",
      icon: "🧠",
      active: isNavItemActive(pathname, "/kb"),
      position: "top",
    },
    {
      name: "Calender",
      href: "/calender",
      icon: "🗓️",
      active: isNavItemActive(pathname, "/calender"),
      position: "top",
    },
    {
      name: "Account",
      href: "/account",
      icon: "👤",
      active: isNavItemActive(pathname, "/account"),
      position: "top",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: "⚙️",
      active: isNavItemActive(pathname, "/settings"),
      position: "bottom",
    },
    {
      name: "Feedback",
      href: "/feedback",
      icon: "🫶",
      active: isNavItemActive(pathname, "/feedback"),
      position: "bottom",
    },
    {
      name: "User",
      href: "/user",
      icon: "⚙️",
      active: isNavItemActive(pathname, "/user"),
      position: "bottom",
    },
  ];
};
