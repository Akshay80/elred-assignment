/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateIcon from "@mui/icons-material/Create";
import foodImg from "../assets/food.png";
import "../styles/HomeScreen.css";
import { useLocation } from "react-router-dom";
import {
  Avatar,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import starImg from "../assets/star.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// SETTING MODAL TITLE AND DIALOG
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: 375,
    border: 0,
    paddingTop: 0,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            padding: "2px !important",
            color: "#E7343F",
            backgroundColor: "#FDEAEC",
            borderRadius: "7px !important",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

// SETTING MODAL TITLE AND DIALOG ENDS HERE

const HomeScreen = () => {
  const useStyles = makeStyles(() => ({
    chipContainer: {
      display: "flex",
      overflowX: "auto",
      whiteSpace: "nowrap",
      scrollbarWidth: "thin",
      scrollbarColor: "#888888 #f0f0f0",
      "&::-webkit-scrollbar": {
        width: "6px",
        height: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "lightgrey",
        borderRadius: "20px",
      },
    },
  }));

  const { state } = useLocation();
  const classes = useStyles();
  const storedData = localStorage.getItem("AboutInformation");
  const data = storedData ? JSON.parse(storedData) : null;
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const [ethicalCodeData, setEthicalCodeData] = useState([]);
  const [ethicalCodeCount, setEthicalCodeCount] = useState(0);

  const [metVideoCallData, setMetVideoCallData] = useState([]);
  const [metVirtualCount, setMetVirtualCount] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };

  const { aboutme, bloodGroup } = data ?? {};

  useEffect(() => {
    fetchEthicalCode();
    fetchVideoCallData();
  }, []);

  // API CALL FOR FETCHING ETHICAL CODE

  const fetchEthicalCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/RatingsEthicalCodeResponse.json`
      );
      setEthicalCodeData(response.data.result);
      setEthicalCodeCount(response.data.ethicalCodeCount);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // API CALL FOR FETCHING MET REAL LIFE VIDEO CALL

  const fetchVideoCallData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/RatingsVirtuallyMetResponse.json`
      );
      setMetVideoCallData(response.data.result);
      setMetVirtualCount(response.data.virtuallyMetCount);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="parentDiv">
        <div className="backArrowDiv">
          <ArrowBackIosIcon fontSize="18" />
        </div>
        <h5>My Bio</h5>
      </div>
      <div className="aboutMeDiv">
        <h5>About me</h5>
        <Link to="edit-about-me">
          <CreateIcon fontSize="18" />
        </Link>
      </div>
      <div style={{ textAlign: "justify", width: 375 }}>
        <textarea
          className="inputField"
          placeholder="No about me added yet"
          value={aboutme !== undefined || null ? aboutme : ""}
          rows={4}
          cols={50}
          disabled
        />
      </div>
      <hr></hr>
      <div className="bloodGroupDiv">
        <h5>Blood group</h5>
        <span>{bloodGroup !== undefined || null ? bloodGroup : ""}</span>
      </div>

      <div className="parentResumeDiv">
        <div className="subResumeDiv">
          <div className="mainResumeDiv">
            <img src={foodImg} alt="resume_img" width={50} />
            <h5>Resume</h5>
          </div>
          <div style={{ paddingRight: 5 }}>
            <ArrowForwardIosIcon fontSize="18" />
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <hr></hr>
      </div>

      {/* Assignment B */}

      <div className="aboutMeDiv">
        <h5>Skills</h5>
        <Link to="skills">
          <CreateIcon fontSize="18" />
        </Link>
      </div>
      <div style={{ textAlign: "justify", width: 375 }}>
        {(state === null ||
          (state.skills?.length === 0 &&
            state.hobby?.length === 0 &&
            state.subjects?.length === 0)) && (
          <p style={{ fontSize: 15, color: "gray", margin: "20px auto" }}>
            No soft skills added yet
          </p>
        )}

        {state?.skills?.length !== 0 && state !== null ? (
          <div style={{ textAlign: "left" }}>
            <h5 style={{ margin: "8px auto" }}>
              I am incredible at these skills / <br />
              professionally great at
            </h5>

            <div>
              <div className={classes.chipContainer}>
                <Stack spacing={1} direction="row" sx={{ mt: 0 }}>
                  {state?.skills?.map((items) => (
                    <Chip
                      key={`${items.value}`}
                      label={`${items.label}`}
                      id={`${items.value}`}
                      className="chips"
                    />
                  ))}
                </Stack>
              </div>
            </div>
            <div style={{ margin: "16px auto" }}>
              <hr></hr>
            </div>
          </div>
        ) : (
          ""
        )}

        {state?.hobby?.length !== 0 && state !== null ? (
          <div style={{ textAlign: "left" }}>
            <h5>Hobbies i am passionate about</h5>

            <div>
              <div className={classes.chipContainer}>
                <Stack spacing={1} direction="row" sx={{ mt: 0 }}>
                  {state?.hobby?.map((items) => (
                    <Chip
                      key={`${items.value}`}
                      label={`${items.label}`}
                      id={`${items.value}`}
                      className="chips"
                    />
                  ))}
                </Stack>
              </div>
            </div>
            <div style={{ margin: "16px auto" }}>
              <hr></hr>
            </div>
          </div>
        ) : (
          ""
        )}

        {state?.subjects?.length !== 0 && state !== null ? (
          <div style={{ textAlign: "left" }}>
            <h5>My favorite subjects are</h5>

            <div>
              <div className={classes.chipContainer}>
                <Stack spacing={1} direction="row" sx={{ mt: 0 }}>
                  {state?.subjects?.map((items) => (
                    <Chip
                      key={`${items.value}`}
                      label={`${items.label}`}
                      id={`${items.value}`}
                      className="chips"
                    />
                  ))}
                </Stack>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Assignment B Ends here */}

      {/* Assignment C */}

      <div className="parentDivforCAssignment">
        <div className="starParentDiv">
          <div className="starSubDiv">
            <img src={starImg} alt="star_img" width={40} />
          </div>

          <div>
            <p style={{ color: "white", textAlign: "left", fontSize: 20 }}>
              Ratings
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={handleClickOpen}
          >
            <p style={{ color: "white" }}>57</p>
            <p style={{ textAlign: "justify", fontSize: 14, color: "white" }}>
              Say has ethical code of conduct and is <br /> safe to do bussiness
              with
            </p>
          </div>

          <div style={{ margin: "10px auto" }}>
            <hr color="white" style={{ borderWidth: "0.1px" }}></hr>
          </div>

          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleClickOpen1}
          >
            <p style={{ color: "white" }}>27</p>
            <p
              style={{
                textAlign: "left",
                fontSize: 14,
                marginLeft: 80,
                color: "white",
              }}
            >
              Have met in real life/Video call
            </p>
          </div>
        </div>
      </div>

      {/* Ethical Code Modal */}

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography>
            <span style={{ fontWeight: "bold" }}>{ethicalCodeCount}</span> say
            has ethical code of condu...
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers={true} gutterBottom>
          {ethicalCodeData.map((ethics) => (
            <>
              <div className="AvatarMainDiv">
                <Avatar
                  alt="Avatar"
                  src={ethics.dpURL}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <div style={{ flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ mb: "-5px" }}>
                    {ethics.firstname} {ethics.lastname}
                  </Typography>
                  <Typography variant="p" sx={{ fontSize: 13, mt: 0 }}>
                    {ethics.title[0].value}
                  </Typography>
                </div>
              </div>
              <Divider orientation="horizontal" flexItem className="dividers" />
            </>
          ))}
        </DialogContent>
      </BootstrapDialog>
      {/* Ethical Code Modal Ends Here */}

      {/* Met Virtually Video Call Modal */}

      <BootstrapDialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title1"
        open={open1}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title1"
          onClose={handleClose1}
        >
          <Typography>
            <span style={{ fontWeight: "bold" }}>{metVirtualCount}</span> have
            met in real life/video call
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers={true} gutterBottom>
          {metVideoCallData.map((metCount) => (
            <>
              <div className="AvatarMainDiv">
                <Avatar
                  alt="Avatar"
                  src={metCount.dpURL}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
                <div style={{ flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ mb: "-5px" }}>
                    {metCount.firstname} {metCount.lastname}
                  </Typography>
                  <Typography variant="p" sx={{ fontSize: 13, mt: 0 }}>
                    {metCount.title[0].value}
                  </Typography>
                </div>
              </div>
              <Divider orientation="horizontal" flexItem className="dividers" />
            </>
          ))}
        </DialogContent>
      </BootstrapDialog>
      {/*Met Virtually Video Call Modal Ends Here */}

      {/* Assignment C Ends here*/}
      <div style={{ textAlign: "left" }}>
        <ToastContainer />
      </div>
    </div>
  );
};

export default HomeScreen;
