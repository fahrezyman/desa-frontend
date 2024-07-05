import { useState } from "react";
import UploadData from "../pages/UploadData";
import CriteriaForm from "../pages/CriteriaForm";
import CalculateSAW from "../pages/CalculateSAW";
import ExportPDF from "../pages/ExportPDF";

const SAWProcess = () => {
  const [currentStep, setCurrentStep] = useState("upload");

  const handleUploadSuccess = () => {
    setCurrentStep("criteria");
  };

  const handleCriteriaSuccess = () => {
    setCurrentStep("calculate");
  };

  const handleCalculateSuccess = () => {
    setCurrentStep("export");
  };

  const handleExportSuccess = () => {
    alert("PDF exported successfully!");
    // Optionally, you can reset the process or perform other actions here
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">Dashboard</div>
        <nav className="flex-1 p-4">
          <ul>
            <li
              className={`mb-4 ${
                currentStep === "upload" ? "bg-blue-700" : ""
              }`}
            >
              <button
                onClick={() => setCurrentStep("upload")}
                className="block w-full text-left py-2 px-4 rounded"
              >
                Upload Data CSV
              </button>
            </li>
            <li
              className={`mb-4 ${
                currentStep === "criteria" ? "bg-blue-700" : ""
              }`}
            >
              <button
                onClick={() => setCurrentStep("criteria")}
                className="block w-full text-left py-2 px-4 rounded"
              >
                Input Kriteria dan Bobot
              </button>
            </li>
            <li
              className={`mb-4 ${
                currentStep === "calculate" ? "bg-blue-700" : ""
              }`}
            >
              <button
                onClick={() => setCurrentStep("calculate")}
                className="block w-full text-left py-2 px-4 rounded"
              >
                Kalkulasi SAW
              </button>
            </li>
            <li
              className={`mb-4 ${
                currentStep === "export" ? "bg-blue-700" : ""
              }`}
            >
              <button
                onClick={() => setCurrentStep("export")}
                className="block w-full text-left py-2 px-4 rounded"
              >
                Ekspor Hasil ke PDF
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4 bg-gray-100">
        {currentStep === "upload" && (
          <UploadData onSuccess={handleUploadSuccess} />
        )}
        {currentStep === "criteria" && (
          <CriteriaForm onSuccess={handleCriteriaSuccess} />
        )}
        {currentStep === "calculate" && (
          <CalculateSAW onSuccess={handleCalculateSuccess} />
        )}
        {currentStep === "export" && (
          <ExportPDF onSuccess={handleExportSuccess} />
        )}
      </main>
    </div>
  );
};

export default SAWProcess;
