import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  List,
  PlusCircle,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const navItems = [
    {
      href: "/instructor/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    { href: "/instructor/add-course", label: "Add Course", icon: PlusCircle },
    {
      href: "/instructor/manage-courses",
      label: "Manage Courses",
      icon: List,
    },
  ];

  const actionItems = [
    {
      label: "Back to Home",
      icon: ArrowLeft,
      onClick: () => navigate("/"),
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: handleLogout,
    },
  ];

  return (
    <SidebarProvider className={cn("h-full border-r transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="md:hidden p-2 fixed top-[64px] left-0 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 pt-[64px]">
            <Sidebar className="w-64">
              <div className="flex items-center justify-between p-2 border-b">
                <span className="text-sm font-semibold">Instructor</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCollapsed(!collapsed)}
                  className="hover:bg-muted"
                >
                  {collapsed ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <SidebarContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-md text-sm font-medium transition w-full",
                            location.pathname === item.href
                              ? "bg-muted text-foreground"
                              : "hover:bg-muted text-muted-foreground",
                            collapsed && "justify-center"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {!collapsed && item.label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <div className="mt-4">
                    {actionItems.map((item, index) => (
                      <SidebarMenuItem key={index}>
                        <SidebarMenuButton
                          onClick={item.onClick}
                          className={cn(
                            "flex items-center gap-3 rounded-md text-sm font-medium transition w-full hover:bg-muted text-muted-foreground",
                            collapsed && "justify-center"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {!collapsed && item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </div>
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:block fixed left-0 top-[64px] h-[calc(100vh-64px)] z-40">
        <Sidebar
          className={cn(
            "h-full border-r transition-all duration-300",
            collapsed ? "w-16" : "w-64"
          )}
        >
          <div className="flex items-center justify-between p-2 border-b">
            <span
              className={cn("text-sm font-semibold", collapsed && "hidden")}
            >
              <Badge className="text-md font-semibold" variant="outline">
                Instructor
              </Badge>
              <span className="ml-2 text-md font-semibold text-muted-foreground">
                {user?.name}
              </span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn("hover:bg-muted", collapsed && "ml-auto")}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md text-sm font-medium transition w-full",
                        location.pathname === item.href
                          ? "bg-muted text-foreground"
                          : "hover:bg-muted text-muted-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="mt-4">
                {actionItems.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton
                      onClick={item.onClick}
                      className={cn(
                        "flex items-center gap-3 rounded-md text-sm font-medium transition w-full hover:bg-muted text-muted-foreground",
                        collapsed && "justify-center"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </aside>
    </SidebarProvider>
  );
};

export default SideBar;
