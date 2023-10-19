import { React, useState, useEffect } from "react";
import "./formDetail.css";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import moment from "moment";

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

function FormDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let [searchParams, setSearchParams] = useSearchParams();

  const { auth } = useAuth();
  const [imgInputState, setImgInputState] = useState("");
  const [previewImgSource, setPreviewImgSource] = useState("");
  const [selectedImgFile, setSelectedImgFile] = useState();
  const [validImage, setValidImage] = useState(false);

  const [title, setTitle] = useState("");
  const [validTitle, setValidTitle] = useState(false);

  const [type, setType] = useState("Running");
  const [validType, setValidType] = useState(false);

  const [date, setDate] = useState("");
  const [validDate, setValidDate] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [validStartTime, setValidStartTime] = useState(false);

  const [endTime, setEndTime] = useState("");
  const [validEndTime, setValidEndTime] = useState(false);

  const [description, setDescription] = useState("");
  const [validDescription, setValidDescription] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (imgInputState) {
      setValidImage(true);
    } else {
      setValidImage(false);
    }
  }, [imgInputState]);

  useEffect(() => {
    if (title) {
      setValidTitle(true);
    } else {
      setValidTitle(false);
    }
  }, [title]);

  useEffect(() => {
    if (type) {
      setValidType(true);
    } else {
      setValidType(false);
    }
  }, [type]);

  useEffect(() => {
    if (date) {
      setValidDate(true);
    } else {
      setValidDate(false);
    }
  }, [date]);

  useEffect(() => {
    if (startTime) {
      setValidStartTime(true);
    } else {
      setValidStartTime(false);
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      setValidEndTime(true);
    } else {
      setValidEndTime(false);
    }
  }, [endTime]);

  useEffect(() => {
    if (description) {
      setValidDescription(true);
    } else {
      setValidDescription(false);
    }
  }, [description]);

  // Editing
  useEffect(() => {
    axios
      .get(`/activities/byid/${searchParams.get("activity_id")}`)
      .then((res) => {
        console.log(res.data.date);
        // const date = new Date(res.data.date);
        // setImgInputState(res.data.img.name || '')
        // setPreviewImgSource(res.data.img.name || '')
        // setSelectedImgFile(res.data.img.name || '')
        var date = new Date(res.data.date);

        var day = ("0" + date.getDate()).slice(-2);
        var month = ("0" + (date.getMonth() + 1)).slice(-2);

        date = date.getFullYear() + "-" + month + "-" + day;

        setTitle(res.data.title || "");
        setType(res.data.activity_type || "");
        setDate(date || "");
        setStartTime(moment(res.data.start_time).format("HH:mm") || "");
        setEndTime(moment(res.data.end_time).format("HH:mm") || "");
        setDescription(res.data.description || "");

        setIsEdit(true);
      });
  }, []);

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

      if (isEdit) {
        await axios
          .put(`/activities/${searchParams.get("activity_id")}`, activity)
          .then((res) => console.log(res.data));
      } else {
        await axios
          .post("/activities", activity)
          .then((res) => console.log(res.data));
      }
      setImgInputState("");
      setPreviewImgSource("");
      setSelectedImgFile("");
      setTitle("");
      setType("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setDescription("");
      navigate(from, { replace: true });
      navigate("/");
    };
    reader.onerror = () => {
      console.error("Fail!!");
    };
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
          <p
            id="uidnote"
            className={!validImage ? "instructions" : "offscreen"}
          >
            Please insert photo.
          </p>
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
            <p
              id="uidnote"
              className={!validTitle ? "instructions" : "offscreen"}
            >
              Invalid Title.
            </p>
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
            <h5
              id="uidnote"
              className={!validDate ? "instructions w-[100%]" : "offscreen"}
            >
              Invalid Date.
            </h5>
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
            <h5
              id="uidnote"
              className={
                !validStartTime ? "instructions w-[100%] mb-5" : "offscreen"
              }
            >
              Invalid Start Time.
            </h5>
            <span>End</span>
            <input
              type="time"
              name="end time"
              onChange={onChangeEndTime}
              value={endTime}
            />
            <h5
              id="uidnote"
              className={!validEndTime ? "instructions w-[100%]" : "offscreen"}
            >
              Invalid End Time.
            </h5>
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
            <h5
              id="uidnote"
              className={
                !validDescription ? "instructions w-[100%]" : "offscreen"
              }
            >
              Invalid Description.
            </h5>
          </div>

          <button
            type="submit"
            value="Submit"
            disabled={
              !validImage ||
              !validTitle ||
              !validDate ||
              !validStartTime ||
              !validEndTime ||
              !validDescription
                ? true
                : false
            }
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default FormDetail;
