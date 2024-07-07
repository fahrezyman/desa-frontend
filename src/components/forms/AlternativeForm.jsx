import PropTypes from "prop-types";

const AlternativeForm = ({
  alternatives,
  criteria,
  handleAlternativeChange,
  addAlternative,
  removeAlternative,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-green-600">Alternatif</h2>
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
              Hapus
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
      <button
        onClick={addAlternative}
        className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        Tambah Alternatif
      </button>
    </div>
  );
};

AlternativeForm.propTypes = {
  alternatives: PropTypes.array.isRequired,
  criteria: PropTypes.array.isRequired,
  handleAlternativeChange: PropTypes.func.isRequired,
  addAlternative: PropTypes.func.isRequired,
  removeAlternative: PropTypes.func.isRequired,
};

export default AlternativeForm;
