import { React, useState } from "react";
import "./formDetail.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";

const config = {
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
  }
}

function FormDetail() {


  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";
  

  const { auth } = useAuth();
  const [imgInputState, setImgInputState] = useState("");
  const [previewImgSource, setPreviewImgSource] = useState("");
  const [selectedImgFile, setSelectedImgFile] = useState();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Running");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgSource(reader.result);
    };
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImgFile(file);
    setImgInputState(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImgFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImgFile);
    reader.onloadend = async () => {
      const activity = {
        img: {
          name: selectedImgFile.name,
          data: reader.result,
          contentType: selectedImgFile.type,
        },
        username: auth.user,
        user_id: auth.user_id,
        title: title,
        activity_type: type,
        date: date,
        start_time: new Date(`${date} ${startTime}`),
        end_time: new Date(`${date} ${endTime}`),
        description: description,
      };
      console.log(activity);

      await axios.post("/activities", activity).then((res) => console.log(res.data));

    };
    reader.onerror = () => {
      console.error("Fail!!");
    };
    setImgInputState("");
    setPreviewImgSource("");
    setSelectedImgFile("");
    setTitle("");
    setType("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    // navigate(from, { replace: true });
    // navigate("/");
  };

  return (
    <div className="form">
      <section>
        <form className="form-component" onSubmit={handleSubmit}>
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={onChangeImage}
            value={imgInputState}
          />
          {previewImgSource && (
            <img
              src={previewImgSource}
              alt="chosen"
              style={{ height: "300px" }}
            />
          )}
          <div className="form-title">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChangeTitle}
            />
          </div>

          <div className="form-type-select">
            <p>Type</p>
            <select name="type" onChange={onChangeType} value={type}>
              <option value="Running">Running</option>
              <option value="Cycling">Cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Weight training">Weight training</option>
              <option value="Walking">Walking</option>
            </select>
          </div>

          <div className="form-date-time">
            <p>Date</p>
            <input
              type="date"
              name="date"
              onChange={onChangeDate}
              value={date}
            />
          </div>

          <div className="form-duration">
            <p>Duration</p>
            <span>Start</span>
            <input
              type="time"
              name="stat time"
              onChange={onChangeStartTime}
              value={startTime}
            />
            <span>End</span>
            <input
              type="time"
              name="end time"
              onChange={onChangeEndTime}
              value={endTime}
            />
          </div>

          <div className="form-desc">
            <p>Description</p>
            <textarea
              id="activity_descrip"
              name="description"
              rows="4"
              cols="50"
              onChange={onChangeDescription}
              value={description}
            ></textarea>
          </div>

          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default FormDetail;
