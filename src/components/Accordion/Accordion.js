import { useState, useEffect } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import "./Accordion.scss";

const ArrowIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
    </svg>
)

const AccordionContent = ({ children, text }) => {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const handleSize = () => {
            if (window.outerWidth < 700) {
                setMobile(true);
            } else {
                setMobile(false);
            }
        }

        window.addEventListener("resize", handleSize);
        
        handleSize()

        return () => {
            window.removeEventListener("resize", handleSize);
        }
    }, []);

    return mobile ? (
       <Accordion>
        <AccordionSummary
          expandIcon={ArrowIcon}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            {text}
        </AccordionSummary>
        <AccordionDetails className="accordion-custom-body">
            {children}
        </AccordionDetails>
      </Accordion>
    ) : children
}

export default AccordionContent