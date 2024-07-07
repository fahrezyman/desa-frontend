import PropTypes from "prop-types";

const CriteriaForm = ({
  criteria,
  handleCriteriaChange,
  addCriteria,
  removeCriteria,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">Kriteria</h2>
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
            Hapus
          </button>
        </div>
      ))}
      <button
        onClick={addCriteria}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6 w-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        Tambah Kriteria
      </button>
    </div>
  );
};

CriteriaForm.propTypes = {
  criteria: PropTypes.array.isRequired,
  handleCriteriaChange: PropTypes.func.isRequired,
  addCriteria: PropTypes.func.isRequired,
  removeCriteria: PropTypes.func.isRequired,
};

export default CriteriaForm;
