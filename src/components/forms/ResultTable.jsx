import PropTypes from "prop-types";

const ResultsTable = ({ criteria, normalized, results }) => {
  return (
    <div>
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
  );
};

ResultsTable.propTypes = {
  criteria: PropTypes.array.isRequired,
  normalized: PropTypes.array.isRequired,
  results: PropTypes.array.isRequired,
};

export default ResultsTable;
