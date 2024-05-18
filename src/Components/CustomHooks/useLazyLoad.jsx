import { useEffect, useState } from "react";

const useLazyLoad = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setImageSrc(src);
    };
  }, [src]);

  return { loaded, imageSrc };
};

export default useLazyLoad;
