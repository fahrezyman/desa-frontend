function Homepage() {
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6">
        <div className="w-full md:w-1/2 p-4 md:p-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-blue-600">
              DESA
            </h2>
            <p className="text-base md:text-lg mb-4 md:mb-6 text-gray-700 font-medium">
              Decision Support Application yang mengimplementasikan metode
              Simple Additive Weighting.
            </p>
            <div className="flex justify-center">
              <a
                href="/app"
                className="inline-block items-center font-bold bg-blue-500 text-white px-4 md:px-8 py-2 md:py-3 rounded-lg text-base md:text-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Mulai disini
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
