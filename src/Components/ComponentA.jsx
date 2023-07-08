import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateIcon from "@mui/icons-material/Create";
import foodImg from "../assets/food.png";

const ComponentA = () => {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "1em", marginTop: "0.2em" }}>
          <ArrowBackIosIcon fontSize="18" />
        </div>
        <h5>My Bio</h5>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h5>About me</h5>
        <Link to="EditComponentA">
          <CreateIcon fontSize="18" />
        </Link>
      </div>
      <div style={{ textAlign: "justify", width: 375 }}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae neque
          dicta repellat quam maxime error veniam nemo, mollitia dolor quas
          maiores illum exercitationem dignissimos nam labor.
        </p>
      </div>
      <hr></hr>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h5>Blood group</h5>
        <p>A + (Positive)</p>
      </div>

      <div style={{ borderRadius: 4, boxShadow: "1px 1px 3px lightgray" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0.3em",
            height: 40,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={foodImg} alt="resume_img" width={50} />
            <h5>Resume</h5>
          </div>
          <div style={{ paddingRight: 5 }}>
            <ArrowForwardIosIcon fontSize="18" />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <hr></hr>
      </div>
    </div>
  );
};

export default ComponentA;
