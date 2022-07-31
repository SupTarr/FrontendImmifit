import React from "react";
import "./formDetail.css";

function FormDetail() {
  return(
    <div className ='form'>
     <section>
      <form className="form-component">
        <div className="form-title">
          <label htmlFor="name">Title</label>
          <input type="text" name="title" />
        </div>

        <div className="form-type-select">
          <p>Type</p>
          <select name="type">
            <option value="run">Run</option>
            <option value="swim">Swim</option>
            <option value="Hiking">Hiking</option>
          </select>
        </div>

        <div className="form-date-time">
          <p>Date / Time</p>
          <input type="date" name="date" />
        </div>

        <div className="form-duration">
          <p>Duration</p>
          <span>Start</span>
          <input type="time" name="duration" />
          <span>End</span>
          <input type="time" name="duration" />
        </div>

        <div className="form-desc">
          <p>Description</p>
          <textarea id="activity_descrip" name="description" rows="4" cols="50">
          </textarea>
        </div>

        <button>ADD ACTIVITIES</button>
      </form>
    </section>
    </div>
  )
}

export default FormDetail;
