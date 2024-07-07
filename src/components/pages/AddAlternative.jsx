import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const AddAlternativeWithCriteria = ({ onSuccess }) => {
  const [alternatives, setAlternatives] = useState([{ name: "", values: {} }]);
  const [criteria, setCriteria] = useState([]);

  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/criteria");
        setCriteria(response.data);
      } catch (error) {
        console.error("Error fetching criteria", error);
      }
    };
    fetchCriteria();
  }, []);

  const handleAlternativeChange = (index, e) => {
    const { name, value } = e.target;
    const newAlternatives = [...alternatives];
    newAlternatives[index][name] = value;
    setAlternatives(newAlternatives);
  };

  const handleAlternativeValueChange = (alternativeIndex, criterionId, e) => {
    const { value } = e.target;
    const newAlternatives = [...alternatives];
    if (!newAlternatives[alternativeIndex].values) {
      newAlternatives[alternativeIndex].values = {};
    }
    newAlternatives[alternativeIndex].values[criterionId] = value;
    setAlternatives(newAlternatives);
  };

  const handleCriteriaChange = (index, e) => {
    const { name, value } = e.target;
    const newCriteria = [...criteria];
    newCriteria[index][name] = name === "is_benefit" ? value === "true" : value;
    setCriteria(newCriteria);
  };

  const addAlternativeRow = () => {
    setAlternatives([...alternatives, { name: "", values: {} }]);
  };

  const removeAlternativeRow = (index) => {
    const newAlternatives = [...alternatives];
    newAlternatives.splice(index, 1);
    setAlternatives(newAlternatives);
  };

  const addCriteriaRow = () => {
    setCriteria([...criteria, { name: "", weight: "", is_benefit: true }]);
  };

  const removeCriteriaRow = (index) => {
    const newCriteria = [...criteria];
    newCriteria.splice(index, 1);
    setCriteria(newCriteria);
  };

  const handleAlternativeSubmit = async (e) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("User ID not found. Please login again.");
      return;
    }
    try {
      await Promise.all(
        alternatives.map(async (alternative) => {
          await axios.post("http://localhost:3000/api/add-alternative", {
            name: alternative.name,
            user_id,
            criteriaValues: alternative.values,
          });
        })
      );
      alert("Alternatives added successfully");
      onSuccess();
    } catch (error) {
      console.error("Error adding alternatives", error);
      alert("Failed to add alternatives");
    }
  };

  const handleCriteriaSubmit = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(
        criteria.map(async (criterion) => {
          await axios.post("http://localhost:3000/api/add-criteria", {
            name: criterion.name,
            weight: parseFloat(criterion.weight),
            is_benefit: criterion.is_benefit,
          });
        })
      );
      alert("Criteria added successfully");
      onSuccess();
    } catch (error) {
      console.error("Error adding criteria", error);
      alert("Failed to add criteria");
    }
  };

  return (
    <div className="flex">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2 mr-4">
        <h3 className="text-lg font-bold mb-4">Add Alternatives</h3>
        <form onSubmit={handleAlternativeSubmit}>
          {alternatives.map((alternative, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Alternative Name"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={alternative.name}
                onChange={(e) => handleAlternativeChange(index, e)}
                required
              />
              {criteria.map((criterion) => (
                <div key={criterion.id} className="mb-4">
                  <input
                    type="number"
                    placeholder={criterion.name}
                    className="w-full px-4 py-2 mt-2 border rounded-md"
                    value={alternative.values[criterion.id] || ""}
                    onChange={(e) =>
                      handleAlternativeValueChange(index, criterion.id, e)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                className="text-red-600 hover:text-red-900 mt-2"
                onClick={() => removeAlternativeRow(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="w-full px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900"
            onClick={addAlternativeRow}
          >
            Add Alternative Row
          </button>
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Submit Alternatives
          </button>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h3 className="text-lg font-bold mb-4">Add Criteria</h3>
        <form onSubmit={handleCriteriaSubmit}>
          {criteria.map((criterion, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Criteria Name"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={criterion.name}
                onChange={(e) => handleCriteriaChange(index, e)}
                required
              />
              <input
                type="number"
                name="weight"
                step="0.01"
                placeholder="Weight"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={criterion.weight}
                onChange={(e) => handleCriteriaChange(index, e)}
                required
              />
              <select
                name="is_benefit"
                className="w-full px-4 py-2 mt-2 border rounded-md"
                value={criterion.is_benefit}
                onChange={(e) => handleCriteriaChange(index, e)}
                required
              >
                <option value="true">Benefit</option>
                <option value="false">Cost</option>
              </select>
              <button
                type="button"
                className="text-red-600 hover:text-red-900 mt-2"
                onClick={() => removeCriteriaRow(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="w-full px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900"
            onClick={addCriteriaRow}
          >
            Add Criteria Row
          </button>
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Submit Criteria
          </button>
        </form>
      </div>
    </div>
  );
};

AddAlternativeWithCriteria.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default AddAlternativeWithCriteria;
