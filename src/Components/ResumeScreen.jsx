import React from "react";
import { useLocation } from "react-router-dom";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useNavigate } from "react-router-dom";

const ResumeScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const handleFirstScreen = () => {
    navigate("/");
  };
  return (
    <div style={{ width: 375 }}>
      {state ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 10 }}>
                <PictureAsPdfIcon />
              </span>
              <p style={{ marginTop: 10 }}>{state.name}</p>
            </div>
            <button
              style={{ borderRadius: 7, border: "none" }}
              onClick={handleFirstScreen}
            >
              <>
                <span style={{ fontWeight: "bold", fontSize: 18 }}>
                  &times;
                </span>
              </>{" "}
            </button>
          </div>
          <div>
            <iframe
              src={URL.createObjectURL(state)}
              width="100%"
              style={{ height: "75vh" }}
              title="PDF Preview"
            />
          </div>
        </>
      ) : (
        <div>No Resume added yet!</div>
      )}
    </div>
  );
};

export default ResumeScreen;
