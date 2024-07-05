import axios from "axios";
import PropTypes from "prop-types";

const ExportPDF = ({ onSuccess }) => {
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/evaluation/export",
        {
          responseType: "blob", // Important for downloading files
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "results.pdf"); // or any other extension
      document.body.appendChild(link);
      link.click();
      onSuccess(); // Call onSuccess to move to the next step if necessary
    } catch (error) {
      console.error("There was an error exporting the PDF:", error);
      alert("Failed to export PDF");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col items-center">
      <h2 className="text-xl mb-4">Export Hasil ke PDF</h2>
      <button
        onClick={handleExport}
        className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
      >
        Export to PDF
      </button>
    </div>
  );
};

ExportPDF.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default ExportPDF;
