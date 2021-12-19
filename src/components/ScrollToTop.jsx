import React, { useEffect, useState } from "react"
import flN from '../assets/flN.png'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {

    const toggleVisibility = () => {
      if (window.pageYOffset > 0) {
        setIsVisible(true);
      }
      else {
        setIsVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility);

  }, []);

  return (
    <div className="container-scroll" aria-label="Click">
      {
        isVisible &&
        <div aria-label="Up to Top" onClick={scrollToTop} id="arrowfixed" >
          <img src={flN} className="scrollup" alt="scrollup icon" />
        </div>
      }

    </div>
  );
}
export default ScrollToTop