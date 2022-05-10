import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import classes from "../styles/Answers.module.css";
import Checkbox from "./Checkbox";

export default function Answers({ options = [], handleChange, input }) {
  return (
    <div className={classes.answers}>
      {options.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <Checkbox
              className={classes.answer}
              text={option.title}
              value={index}
              checked={option.checked}
              onChange={(e) => handleChange(e, index)}
            ></Checkbox>
          ) : (
            <Checkbox
              className={`${classes.answer} ${
                option.correct
                  ? classes.correct
                  : classes.checked
                  ? classes.wrong
                  : null
              }`}
              text={option.title}
              value={index}
              defaultChecked={option.checked}
              disabled
            ></Checkbox>
          )}
        </Fragment>
      ))}
    </div>
  );
}
