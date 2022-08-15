import {React, useState} from "react";
import "./formDetail.css";
import axios from "axios";

function FormDetail() {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Running');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  }

  const onChangeType = (e) => {
    setType(e.target.value);
  }

  const onChangeDate = (e) => {
    setDate(e.target.value);
  }

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  }

  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const activity = {
      img: {
        data: image,
      },
      username: 'Tata',
      user_id: '1',
      title: title,
      activity_type: type, 
      date: date,
      start_time: new Date(`${date} ${startTime}`),
      end_time: new Date(`${date} ${endTime}`),
      description: description
    }
    axios.post('http://localhost:5000/activities', activity)
      .then(res => console.log(res.data));
  }

  return(
    <div className ='form'>
     <section>
      <form className="form-component" onSubmit={handleSubmit}>
        <label htmlFor="image">Upload Image</label>
        <input type="file" id="image" name="image" onChange={onChangeImage} />
        <div className="form-title">
          <label htmlFor="name">Title</label>
          <input type="text" name="title" value={title} onChange={onChangeTitle} />
        </div>

        <div className="form-type-select">
          <p>Type</p>
          <select name="type" onChange={onChangeType} value={type}>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimmimg">Swimmimg</option>
            <option value="Weight training">Weight training</option>
            <option value="Walking">Walking</option>
          </select>
        </div>

        <div className="form-date-time">
          <p>Date</p>
          <input type="date" name="date" onChange={onChangeDate} value={date} />
        </div>

        <div className="form-duration">
          <p>Duration</p>
          <span>Start</span>
          <input type="time" name="stat time" onChange={onChangeStartTime} value={startTime} />
          <span>End</span>
          <input type="time" name="end time" onChange={onChangeEndTime} value={endTime} />
        </div>

        <div className="form-desc">
          <p>Description</p>
          <textarea id="activity_descrip" name="description" rows="4" cols="50" onChange={onChangeDescription} value={description}>
          </textarea>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </section>
    </div>
  )
}

export default FormDetail;