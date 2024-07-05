import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CriteriaForm = ({ onSuccess }) => {
  const [criteria, setCriteria] = useState([
    { name: "", weight: "", isBenefit: true },
  ]);

  const handleChange = (index, field, value) => {
    const newCriteria = [...criteria];
    newCriteria[index][field] = value;
    setCriteria(newCriteria);
  };

  const handleAddCriteria = () => {
    setCriteria([...criteria, { name: "", weight: "", isBenefit: true }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/criteria", criteria);
      alert("Criteria saved successfully");
      onSuccess(); // Callback to parent component to proceed to next step
    } catch (error) {
      console.error("There was an error saving the criteria:", error);
      alert("Failed to save criteria");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {criteria.map((criterion, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={criterion.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
              className="px-4 py-2 border rounded-md mb-2 w-full"
              required
            />
            <input
              type="number"
              placeholder="Weight"
              value={criterion.weight}
              onChange={(e) => handleChange(index, "weight", e.target.value)}
              className="px-4 py-2 border rounded-md mb-2 w-full"
              required
            />
            <select
              value={criterion.isBenefit}
              onChange={(e) =>
                handleChange(index, "isBenefit", e.target.value === "true")
              }
              className="px-4 py-2 border rounded-md mb-2 w-full"
            >
              <option value={true}>Benefit</option>
              <option value={false}>Cost</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddCriteria}
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-900 mb-4"
        >
          Add Criterion
        </button>
        <button
          type="submit"
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
        >
          Save Criteria
        </button>
      </form>
    </div>
  );
};

CriteriaForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CriteriaForm;
