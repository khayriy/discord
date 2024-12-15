import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
