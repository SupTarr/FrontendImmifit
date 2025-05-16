import React, { useState, useEffect, ReactNode, lazy } from "react";
const PageLoading = lazy(() => import("../pages/PageLoading"));

interface DelayedRenderProps {
  children: ReactNode;
  delay: number;
}

const DelayedRender: React.FC<DelayedRenderProps> = ({ children, delay }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isReady) {
    return <PageLoading />;
  }

  return <>{children}</>;
};

export default DelayedRender;
