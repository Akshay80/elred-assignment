import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import resumeImg from "../assets/Resume.jpg";
import { Box, Modal, Typography } from "@mui/material";

const EditComponentA = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "1em", marginTop: "0.2em" }}>
          <Link to="/">
            <ArrowBackIosIcon fontSize="18" />
          </Link>
        </div>
        <h5>My Bio</h5>
      </div>
      <div style={{ textAlign: "left" }}>
        <p>Write something about yourself?</p>
      </div>
      <div style={{ backgroundColor: "#F2F4F9", padding: "0.3em", width: 375 }}>
        <p style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
          dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <p style={{ textAlign: "end", fontWeight: 300 }}>0/200</p>

      {/* Resume Section */}
      <div style={{ boxShadow: "1px 1px 3px lightgray" }}>
        <div>
          <img src={resumeImg} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: "0.8em",
            }}
          >
            <PictureAsPdfIcon />
            <p
              style={{ fontSize: 14, fontWeight: "600", paddingLeft: "0.8em" }}
            >
              My Resume.pdf
            </p>
          </div>
          <div style={{ paddingRight: "0.8em" }}>
            <DeleteIcon fontSize="21" color="error" onClick={handleOpen} />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ textAlign: "center" }}>
            <DeleteIcon color="error" />
          </div>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, mb: 3, textAlign: "center" }}
          >
            Are you sure you want to delete your resume ?
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button
              style={{
                color: "red",
                background: "#fff",
                borderRadius: 20,
                padding: "1em",
                border: "none",
                letterSpacing: "0.3em",
                fontWeight: "bold",
                border: "1px solid black",
              }}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              style={{
                color: "#fff",
                background: "#E72D38",
                borderRadius: 20,
                padding: "1em",
                border: "none",
                letterSpacing: "0.3em",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        </Box>
      </Modal>

      <div>
        <h5 style={{ textAlign: "left" }}>Blood Group</h5>
        <div style={{ padding: "0.1em", paddingRight: "0.1em" }}>
          <select
            style={{
              backgroundColor: "#F2F4F9",
              padding: "1em",
              width: "100%",
              fontWeight: "500",
            }}
          >
            <option value="A">A positive (A+)</option>
            <option value="B">B positive (B+)</option>
            <option value="O">O positive (O+)</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: "5em" }}>
        <button
          style={{
            color: "#fff",
            background: "#E72D38",
            width: "100%",
            borderRadius: 20,
            padding: "1em",
            border: "none",
            letterSpacing: "0.3em",
            fontWeight: "bold",
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditComponentA;
