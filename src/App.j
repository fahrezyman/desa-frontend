import { useState } from "react";
import axios from "axios";

const App = () => {
  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [results, setResults] = useState([]);
  const [normalized, setNormalized] = useState([]);

  const handleCriteriaChange = (index, field, value) => {
    const newCriteria = [...criteria];
    if (field === "weight") {
      newCriteria[index][field] = value;
    } else {
      newCriteria[index][field] = value;
    }
    setCriteria(newCriteria);
  };

  const addAlternative = () => {
    const newAlternative = {
      id: alternatives.length + 1,
      name: "",
      criteria: new Array(criteria.length).fill("0"),
    };
    setAlternatives([...alternatives, newAlternative]);
  };

  const handleAlternativeChange = (altIndex, field, value) => {
    const newAlternatives = [...alternatives];
    if (field === "name") {
      newAlternatives[altIndex][field] = value;
    } else {
      newAlternatives[altIndex].criteria[field] = value;
    }
    setAlternatives(newAlternatives);
  };

  const addCriteria = () => {
    setCriteria([...criteria, { name: "", weight: "0", type: "benefit" }]);
    const newAlternatives = alternatives.map((alt) => ({
      ...alt,
      criteria: [...alt.criteria, "0"],
    }));
    setAlternatives(newAlternatives);
  };

  const removeCriteria = (index) => {
    const newCriteria = criteria.filter((_, i) => i !== index);
    setCriteria(newCriteria);
    const newAlternatives = alternatives.map((alt) => {
      const newAltCriteria = alt.criteria.filter((_, i) => i !== index);
      return { ...alt, criteria: newAltCriteria };
    });
    setAlternatives(newAlternatives);
  };

  const removeAlternative = (index) => {
    const newAlternatives = alternatives.filter((_, i) => i !== index);
    setAlternatives(newAlternatives);
  };

  const calculateSAW = () => {
    const criteriaWeights = criteria.map((crit) =>
      parseFloat(crit.weight.replace(",", "."))
    );
    const criteriaTypes = criteria.map((crit) => crit.type);
    const formattedAlternatives = alternatives.map((alt) => ({
      ...alt,
      criteria: alt.criteria.map((crit) => parseFloat(crit.replace(",", "."))),
    }));

    axios
      .post("http://localhost:3000/api/calculate", {
        alternatives: formattedAlternatives,
        criteriaWeights,
        criteriaTypes,
      })
      .then((response) => {
        setNormalized(response.data.normalized);
        setResults(response.data.scores);
      })
      .catch((error) => {
        console.error("There was an error calculating the SAW scores!", error);
      });
  };

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          DESA - Decision Support Application
        </h1>
        <h3 className="text-xl font-semibold mb-4 text-center">
          Implementing Simple Additive Weighting
        </h3>

        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Criteria</h2>
        {criteria.map((crit, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col md:flex-row items-center"
          >
            <input
              type="text"
              value={crit.name}
              onChange={(e) =>
                handleCriteriaChange(index, "name", e.target.value)
              }
              placeholder={`Criteria ${index + 1} Name`}
              className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
            />
            <input
              type="text"
              value={crit.weight}
              onChange={(e) =>
                handleCriteriaChange(index, "weight", e.target.value)
              }
              placeholder="Weight"
              className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
            />
            <select
              value={crit.type}
              onChange={(e) =>
                handleCriteriaChange(index, "type", e.target.value)
              }
              className="mb-2 md:mb-0 md:mr-2 p-2 border rounded w-full md:w-auto"
            >
              <option value="benefit">Benefit</option>
              <option value="cost">Cost</option>
            </select>
            <button
              onClick={() => removeCriteria(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addCriteria}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6 w-full"
        >
          Add Criteria
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          Alternatives
        </h2>
        {alternatives.map((alt, altIndex) => (
          <div key={alt.id} className="mb-4 p-4 border rounded bg-gray-50">
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={alt.name}
                onChange={(e) =>
                  handleAlternativeChange(altIndex, "name", e.target.value)
                }
                placeholder={`Alternative ${altIndex + 1} Name`}
                className="p-2 border rounded w-full"
              />
              <button
                onClick={() => removeAlternative(altIndex)}
                className="bg-red-500 text-white px-2 py-1 rounded ml-2"
              >
                Remove
              </button>
            </div>
            {criteria.map((crit, critIndex) => (
              <div key={critIndex} className="mb-2">
                <label className="mr-2">{crit.name}:</label>
                <input
                  type="text"
                  value={alt.criteria[critIndex]}
                  onChange={(e) =>
                    handleAlternativeChange(altIndex, critIndex, e.target.value)
                  }
                  placeholder={crit.name}
                  className="p-2 border rounded w-full"
                />
              </div>
            ))}
          </div>
        ))}
        <div className="mb-6">
          <button
            onClick={addAlternative}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Add Alternative
          </button>

          <button
            onClick={calculateSAW}
            className="bg-purple-500 text-white px-4 py-2 rounded w-full"
          >
            Calculate
          </button>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-purple-600">Results</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Alternative</th>
                {criteria.map((crit, index) => (
                  <th key={index} className="px-4 py-2">
                    {crit.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {normalized.map((alt) => (
                <tr key={alt.id}>
                  <td className="border px-4 py-2">{alt.name}</td>
                  {alt.normalizedCriteria.map((value, index) => (
                    <td key={index} className="border px-4 py-2">
                      {value.toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-2xl font-semibold mt-6 text-purple-600">
          Preference Scores
        </h2>
        <ul className="list-disc pl-6">
          {results.map((result) => (
            <li key={result.id} className="mb-2">
              {result.name}: {result.score.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
