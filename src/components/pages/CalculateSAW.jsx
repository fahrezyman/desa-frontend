import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CalculateSAW = ({ onSuccess }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/evaluation/calculate"
        );
        setResults(response.data);
        onSuccess(); // Callback to parent component to proceed to next step
      } catch (error) {
        console.error("There was an error fetching the results:", error);
      }
    };

    fetchResults();
  }, [onSuccess]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-xl mb-4">Results</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Alternative</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="bg-gray-100">
              <td className="py-2 text-center">{result.alternative_id}</td>
              <td className="py-2 text-center">{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CalculateSAW.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default CalculateSAW;
