import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

export const Accordion = withStyles({
  root: {
    border: "none",
    boxShadow: "none",
    fontFamily: "Noto Sans JP",
    backgroundColor: "#fafafa",
    margin: 0,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
  root: {
    padding: "16px 0",
    minHeight: 0,
    maxWidth: "150px",
    "&$expanded": {
      minHeight: 0,
    },
  },
  content: {
    margin: 0,
    "&$expanded": {
      margin: 0,
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const AccordionDetails = withStyles({
  root: {
    padding: 0,
  },
})(MuiAccordionDetails);
