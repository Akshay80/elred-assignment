import React, { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { Button, Stack, Typography, styled } from "@mui/material";
import "../../styles/EditAboutMe.css";
import uploadImg from "../../assets/upload.png";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const EditAboutMe = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState("");

  const maxLength = 500; // Maximum character length
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const submitData = (data) => {
    setText(data.aboutme);
    if (
      data.selectedFile &&
      isDelete === false &&
      data.selectedFile.length === 0
    ) {
      setError({
        type: "required",
        message: "Atleast Upload Resume!",
      });
      return;
    }
    const file = data.selectedFile[0];
    if (file.type !== "application/pdf") {
      setError({
        type: "filetype",
        message: "Only PDFs are allowed!",
      });
      return;
    } else if (file.size > MAX_FILE_SIZE) {
      setError({
        type: "validate",
        message: "File size exceeds 5MB limit!",
      });
      return;
    } else {
      setError("");
        setSelectedFile(data.selectedFile[0]);
        const finalData = {
          aboutme: data.aboutme,
          bloodGroup: data.bloodGroup,
        };
        const json = JSON.stringify(finalData);
        localStorage.setItem("AboutInformation", json);
      }
  };

  const handleDelete = () => {
    setSelectedFile("");
    setDelete(true);
    handleClose();
  };

  const handleViewResume = () => {
    navigate("/resume", { state: selectedFile });
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
      <form onSubmit={handleSubmit(submitData)}>
        <div style={{ textAlign: "left" }}>
          <p>Write something about yourself?</p>
        </div>

        <div style={{ position: "relative" }}>
          <textarea
            className="inputField"
            maxLength={maxLength}
            rows={4}
            cols={50}
            placeholder="Write something here.."
            style={{ backgroundColor: "#F2F4F9", padding: "1em", width: 375 }}
            {...register("aboutme", {
              required: "This field is required!",
              minLength: {
                message: "Required atleast 3 to 500 words!",
                value: 3,
              },
            })}
          />
          {errors.aboutme && <p className="errors">{errors.aboutme.message}</p>}
        </div>
        <div
          style={{
            textAlign: "end",
            padding: "4px",
            fontSize: "12px",
            color: text.length > maxLength ? "red" : "black",
          }}
        >
          {text.length}/{maxLength}
        </div>

        {/* Upload Ends here */}

        {selectedFile && selectedFile !== "" ? (
          <div style={{ boxShadow: "1px 1px 3px lightgray" }}>
            <div>
              <iframe
                src={URL.createObjectURL(selectedFile)}
                width="100%"
                height="80"
                title="PDF Preview"
              />
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
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    paddingLeft: "0.8em",
                  }}
                >
                  {selectedFile.name}
                </p>
              </div>

              <div style={{ paddingRight: "0.8em", margin: 10 }}>
                <RemoveRedEyeIcon
                  color="success"
                  onClick={handleViewResume}
                  sx={{ marginRight: 1 }}
                />

                <DeleteIcon color="error" onClick={handleClickOpen} />
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: "F6F9FE",
              border: "1px dashed gray",
              borderRadius: "3px",
              margin: "10px auto",
            }}
          >
            {/* Div for Adding Input Type File */}
            <label htmlFor="file-upload" className="custom-file-upload">
              <div>
                <img
                  src={uploadImg}
                  alt=""
                  width={50}
                  style={{ marginTop: "10px" }}
                />
                <p style={{ marginTop: "0px" }}>Upload Resume</p>
              </div>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              name="selectedFile"
              style={{ display: "none" }}
              {...register("selectedFile")}
            />
            {/* Ending Div for Adding Input Type File */}
          </div>
        )}
        {error.type === "required" && <p className="errors">{error.message}</p>}
        {error.type === "filetype" && <p className="errors">{error.message}</p>}
        {error.type === "validate" && <p className="errors">{error.message}</p>}

        {/* Resume Section */}

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
              {...register("bloodGroup", { required: true })}
            >
              <option value="">Select blood group</option>
              <option value="A positive (A+)">A positive (A+)</option>
              <option value="B positive (B+)">B positive (B+)</option>
              <option value="O positive (O+)">O positive (O+)</option>
            </select>
          </div>

          {errors.bloodGroup && (
            <p className="errors">Please select a blood group!</p>
          )}
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
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <DeleteIcon color="error" fontSize="large" />
          </div>
          <DialogContent>
            <Typography
              gutterBottom
              width={300}
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Are you sure you want to delete
              <br /> your resume ?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Stack
              spacing={2}
              direction="row"
              sx={{ margin: "auto", paddingBottom: "10px" }}
            >
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{ borderRadius: "20px" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                sx={{ borderRadius: "20px" }}
              >
                Delete
              </Button>
            </Stack>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
};

export default EditAboutMe;
