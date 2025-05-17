import { useEffect, useState } from "react";

export default function Form({
  employeesList,
  setEmployessList,
  editingEmp,
  setEditingEmp,
}) {
  const [employee, setEmployee] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (name === "tags") {
      let tagsArray = Array.isArray(employee.tags) ? [...employee.tags] : [];
      if (checked) {
        tagsArray.push(value);
      } else {
        tagsArray = tagsArray.filter((tag) => tag !== value);
      }

      setEmployee({ ...employee, tags: tagsArray });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingEmp) {
        const updatedList = employeesList.map((emp) => {
          if (emp.id === editingEmp.id) {
            return employee; //why return employee because all form data submission is handled by employee so if editingemp and list of emp have a match return the edited data in the form or simply return all emp
          }
          return emp;
        });

        setEmployessList(updatedList);
        setEditingEmp(null);
        console.log("emp edited");
      } else {
        const newEmp = { ...employee, id: Date.now() };
        setEmployessList([...employeesList, newEmp]);
        console.log("employee added to employee list");
      }

      setEmployee({});
    } catch (err) {
      console.log("could not add employee", e);
    }
  }

  useEffect(() => {
    if (editingEmp) {
      setEmployee(editingEmp);
    }
  }, [editingEmp]);

  return (
    <form method="post" onSubmit={handleSubmit}>
      {/* 1-name */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={employee.name || ""}
          onChange={handleChange}
        />
      </div>

      {/* 2-email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={employee.email || ""}
          onChange={handleChange}
        />
      </div>

      {/* 3-password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={employee.password || ""}
          onChange={handleChange}
        />
      </div>

      {/* 4-tags */}
      <div className="mb-3">
  <h5 className="mb-2">Select Tags</h5>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="checkbox"
      value="python"
      id="python"
      name="tags"
      checked={employee.tags?.includes("python") || false}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="python">
      Python
    </label>
  </div>

  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="checkbox"
      value="javascript"
      id="javascript"
      name="tags"
      checked={employee.tags?.includes("javascript") || false}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="javascript">
      JavaScript
    </label>
  </div>
</div>


      <button type="submit" className="btn btn-primary mt-3 w-100">
        {editingEmp ? "Update Employee" : "Add Employee"}
      </button>
    </form>
  );
}
