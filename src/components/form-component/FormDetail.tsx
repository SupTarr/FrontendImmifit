import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./formDetail.css";
import axios from "../../api/axios";
import { AxiosResponse } from "axios";
import useAuth from "../../hooks/useAuth";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  Location,
  NavigateFunction,
} from "react-router-dom";
import moment from "moment";

interface ActivityImage {
  name: string;
  data: string | ArrayBuffer | null;
  contentType: string;
}

interface Activity {
  img: ActivityImage;
  username: string;
  user_id: string;
  title: string;
  activity_type: string;
  date: string;
  start_time: Date;
  end_time: Date;
  description: string;
}

interface ActivityResponse {
  title: string;
  activity_type: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  [key: string]: any;
}

const FormDetail: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const state = location.state as { from?: { pathname?: string } } | null;
  const from: string = state?.from?.pathname || "/";
  const [searchParams] = useSearchParams();

  const { auth } = useAuth() as any;
  const [imgInputState, setImgInputState] = useState<string>("");
  const [previewImgSource, setPreviewImgSource] = useState<string>("");
  const [selectedImgFile, setSelectedImgFile] = useState<File | undefined>();
  const [validImage, setValidImage] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [validTitle, setValidTitle] = useState<boolean>(false);

  const [type, setType] = useState<string>("Running");
  const [validType, setValidType] = useState<boolean>(false);

  const [date, setDate] = useState<string>("");
  const [validDate, setValidDate] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<string>("");
  const [validStartTime, setValidStartTime] = useState<boolean>(false);

  const [endTime, setEndTime] = useState<string>("");
  const [validEndTime, setValidEndTime] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [validDescription, setValidDescription] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);

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
    const activityId = searchParams.get("activity_id");
    if (!activityId) return;

    axios
      .get<ActivityResponse>(`/activities/byid/${activityId}`)
      .then((res: AxiosResponse<ActivityResponse>) => {
        console.log(res.data.date);
        // const date = new Date(res.data.date);
        // setImgInputState(res.data.img.name || '')
        // setPreviewImgSource(res.data.img.name || '')
        // setSelectedImgFile(res.data.img.name || '')
        var dateObj = new Date(res.data.date);

        var day = ("0" + dateObj.getDate()).slice(-2);
        var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

        const formattedDate = dateObj.getFullYear() + "-" + month + "-" + day;

        setTitle(res.data.title || "");
        setType(res.data.activity_type || "");
        setDate(formattedDate || "");
        setStartTime(moment(res.data.start_time).format("HH:mm") || "");
        setEndTime(moment(res.data.end_time).format("HH:mm") || "");
        setDescription(res.data.description || "");

        setIsEdit(true);
      })
      .catch((error) => {
        console.error("Error fetching activity:", error);
      });
  }, [searchParams]);

  const previewFile = (file: File): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImgSource(reader.result as string);
    };
  };

  const onChangeImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImgFile(file);
    setImgInputState(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const onChangeType = (e: ChangeEvent<HTMLSelectElement>): void => {
    setType(e.target.value);
  };

  const onChangeDate = (e: ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  const onChangeStartTime = (e: ChangeEvent<HTMLInputElement>): void => {
    setStartTime(e.target.value);
  };

  const onChangeEndTime = (e: ChangeEvent<HTMLInputElement>): void => {
    setEndTime(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(validType);
    if (!selectedImgFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImgFile);
    reader.onloadend = async () => {
      const activity: Activity = {
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

      try {
        const activityId = searchParams.get("activity_id");
        if (isEdit && activityId) {
          await axios.put(`/activities/${activityId}`, activity);
        } else {
          await axios.post("/activities", activity);
        }

        // Reset form state
        setImgInputState("");
        setPreviewImgSource("");
        setSelectedImgFile(undefined);
        setTitle("");
        setType("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setDescription("");
        navigate(from, { replace: true });
        navigate("/");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    reader.onerror = () => {
      console.error("Failed to read file!");
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
                !validStartTime ? "instructions mb-5 w-[100%]" : "offscreen"
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
              rows={4}
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
};

export default FormDetail;
