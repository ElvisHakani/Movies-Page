import { useEffect, useState } from "react";

const useResponsive = () => {
    const [responisive, setResponsive] = useState(window.innerWidth < 1090);
  
    useEffect(() => {
      const handleResize = () => {
        setResponsive(window.innerWidth < 1090);
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return responisive;
  };

  export default useResponsive;