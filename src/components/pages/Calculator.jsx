/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import axios from "axios";
import CriteriaForm from "../forms/CriteriaForm";
import AlternativeForm from "../forms/AlternativeForm";
import ResultsTable from "../forms/ResultTable";

const Calculator = () => {
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
    <div className="App p-6 bg-gray-300 min-h-screen">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          <a href="/">DESA - Decision Support Application</a>
        </h1>
        <h3 className="text-xl font-semibold mb-4 text-center">
          Implementasi Simple Additive Weighting
        </h3>

        <CriteriaForm
          criteria={criteria}
          handleCriteriaChange={handleCriteriaChange}
          addCriteria={addCriteria}
          removeCriteria={removeCriteria}
        />

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Apa itu Kriteria?
          </h4>
          <p className="text-gray-600">
            Kriteria adalah faktor-faktor yang akan Anda gunakan untuk
            mengevaluasi alternatif. Setiap kriteria harus memiliki nama, bobot
            (yang menunjukkan kepentingannya), dan jenis (baik "benefit" atau
            "cost"). Kriteria "benefit" berarti nilai yang lebih tinggi lebih
            baik, sedangkan kriteria "cost" berarti nilai yang lebih rendah
            lebih baik.
          </p>
        </div>

        <AlternativeForm
          alternatives={alternatives}
          criteria={criteria}
          handleAlternativeChange={handleAlternativeChange}
          addAlternative={addAlternative}
          removeAlternative={removeAlternative}
        />

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            Apa itu Alternatif?
          </h4>
          <p className="text-gray-600">
            Alternatif adalah berbagai opsi yang Anda pertimbangkan. Untuk
            setiap alternatif, Anda perlu memberikan nama dan nilai untuk setiap
            kriteria. Nilai-nilai ini menunjukkan seberapa baik setiap
            alternatif berkinerja sesuai dengan setiap kriteria.
          </p>
        </div>

        <button
          onClick={calculateSAW}
          className="bg-purple-500 text-white px-4 py-2 rounded w-full mb-6 hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Hitung
        </button>

        <ResultsTable
          criteria={criteria}
          normalized={normalized}
          results={results}
        />
      </div>
    </div>
  );
};

export default Calculator;
