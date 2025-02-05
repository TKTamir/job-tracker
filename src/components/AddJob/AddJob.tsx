import React from "react";

const AddJob: React.FC = () => {

  return (
    <div className="AddJob">
      <h2 className="text-lg font-semibold mt-4 mb-4">Add New Job</h2>
      <form className="flex flex-col gap-3">
        <input type="text" placeholder="Company Name"/>
        <input type="text" placeholder="Position"/>
        <input type="text" placeholder="Requested Salary"/>
        <input type="text" placeholder="Application Date"/>
        <button type="submit" onClick={() => alert('Job Saved')}>Save Job</button>
      </form>
    </div>
  )
}

export default AddJob;