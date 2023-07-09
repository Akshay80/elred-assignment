import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Select from "react-select";
import "../../styles/EditSkills.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";

const EditSkills = () => {
  const navigate = useNavigate();
  // USING STATES FOR SETTING THE DATA FROM AN API
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // USING STATE HERE TO SET THE STATE OF SELECTED VALUES FROM SELECT

  const [selectedSkills, setSkillesValues] = useState([]);
  const [selectedHobbies, setHobbiesValues] = useState([]);
  const [selectedSubjects, setSubjectValues] = useState([]);

  const animatedComponents = makeAnimated();

  useEffect(() => {
    skillsApiData();
    hobbiesApiData();
    subjectsApiData();
  }, []);

  // API CALL HERE FOR GETTING SKILLS 

  const skillsApiData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetProfessionalSkillsResponse.json`
      );
      setSkills(response.data.result[0].skills);
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

  // API CALL HERE FOR GETTING HOBBIES

  const hobbiesApiData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetHobbiesResponse.json`
      );
      setHobbies(response.data.result[0].hobbies);
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

  // API CALL HERE FOR GETTING SUBJECTS

  const subjectsApiData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/GetSubjectsResponse.json`
      );
      setSubjects(response.data.result[0].subjects);
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

  // Define the options array with the data
  const skillOptions = [{skills}];
  const hobbiesOptions = [{hobbies}];
  const subjectOptions = [{subjects}];

  // Extract the skills array from the options
  const skillArray = skillOptions[0]?.skills || [];
  const hobbyArray = hobbiesOptions[0]?.hobbies || [];
  const subjectArray = subjectOptions[0]?.subjects || [];

  // Transform the skills array into the format expected by react-select
  const skilledOptions = skillArray.map((skill) => ({
    value: skill._id,
    label: skill.value,
  }));

  // Transform the hobbies array into the format expected by react-select
  const hobbyOptions = hobbyArray.map((hobby) => ({
    value: hobby._id,
    label: hobby.value,
  }));

  // Transform the subjects array into the format expected by react-select
  const subjectsOptions = subjectArray.map((subject) => ({
    value: subject._id,
    label: subject.value,
  }));

  const handleSkillChange = (skillOptions) => {
    setSkillesValues(skillOptions);
  };

  const handlehobbyChange = (hobbyOptions) => {
    setHobbiesValues(hobbyOptions);
  };

  const handleSubjectChange = (subjectOptions) => {
    setSubjectValues(subjectOptions);
  };

  // NAVIGATING AFTER SAVING DATA AND PASSING PROPS TO PARENT USING USENAVIGATE HOOK

  const handleNavigate = () => {
    navigate("/", {
      state: {
        hobby: selectedHobbies,
        skills: selectedSkills,
        subjects: selectedSubjects,
      },
    });
  };

  return (
    <div style={{ width: 375 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "1em", marginTop: "0.2em" }}>
          <Link to="/">
            <ArrowBackIosIcon fontSize="18" />
          </Link>
        </div>
        <h5>Skills</h5>
      </div>

      <div style={{ textAlign: "left" }}>
        <h4>
          I am incredible at these skills / <br />
          professionally great at
        </h4>
      </div>

      <div
        className="selectDiv"
      >
        <Select
          components={animatedComponents}
          isMulti
          name="colors"
          options={skilledOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSkillChange}
          value={selectedSkills}
        />
      </div>

      <div style={{ textAlign: "left" }}>
        <h4>Hobbies i am passionate about</h4>
      </div>

      <div
        className="selectDiv"
      >
        <Select
          components={animatedComponents}
          isMulti
          name="colors"
          options={hobbyOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handlehobbyChange}
          value={selectedHobbies}
        />
      </div>

      <div style={{ textAlign: "left" }}>
        <h4>My favorite subjects are</h4>
      </div>

      <div
        className="selectDiv"
      >
        <Select
          components={animatedComponents}
          isMulti
          name="colors"
          options={subjectsOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleSubjectChange}
          value={selectedSubjects}
        />
      </div>

      <div style={{ marginTop: "10em", marginBottom: 10 }}>
        <button
          className="saveBtn"
          onClick={handleNavigate}
        >
          Save
        </button>
      </div>

      <div style={{ textAlign: "left" }}>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditSkills;
