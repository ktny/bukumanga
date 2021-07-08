import { Divider } from "@material-ui/core";
import { Accordion, AccordionDetails, AccordionSummary } from "../util/accordion";
import SearchIcon from "@material-ui/icons/Search";
import Period from "./period";
import PeriodGroup from "./period-group";
import Keyword from "./keyword";
import BookmarkCount from "./bookmark-count";
import Publisher from "./publisher";
import classes from "../../styles/search.module.scss";

export default function Search(props) {
  return (
    <div>
      <div className={classes.root}>
        <Keyword {...props}></Keyword>
        <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
        <Period {...props}></Period>
        {props.isSP ? <PeriodGroup {...props} className={classes.periodGroup}></PeriodGroup> : <></>}
        <Divider orientation="vertical" flexItem classes={{ root: classes.divider }} />
        <BookmarkCount {...props}></BookmarkCount>
      </div>
      <Accordion>
        <AccordionSummary>
          <div className={classes.detailSearchSummary}>
            <SearchIcon></SearchIcon>
            <span className={classes.detailSearch}>詳細検索</span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Publisher {...props}></Publisher>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
