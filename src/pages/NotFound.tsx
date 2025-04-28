
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Result, Button } from "antd";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" href="/">
            Return to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
