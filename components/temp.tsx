import React from "react";

const MyComponent = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      // Bây giờ bạn có thể truy cập và thao tác với phần tử DOM
      console.log(containerRef.current);
    }
  }, []);

  return <div ref={containerRef}>Đây là một phần tử div</div>;
};

export default MyComponent;
