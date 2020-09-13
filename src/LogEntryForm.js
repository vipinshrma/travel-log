import React from "react";
import { useForm } from "react-hook-form";
import { createLogEntries } from "./Api";

export default function LogEntryForm({ location, onClose }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntries(data);
      console.log(created);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" required ref={register} />
        <label htmlFor="comments">Comments</label>
        <input type="text" name="comments" required ref={register} />
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={3} ref={register}></textarea>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" ref={register} />
        <label htmlFor="visitDate">Visit Date</label>
        <input type="date" name="visitDate" required ref={register} />
        <button>Create Log Entry</button>
      </form>
    </div>
  );
}
