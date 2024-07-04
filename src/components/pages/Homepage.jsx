import LoginCard from "../card/Login";

function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-center w-full max-w-6xl p-4">
        <div className="text-center md:text-left md:flex-1 mb-6 md:mb-0 md:mr-4">
          <h1 className="text-3xl text-blue-600 mb-4">DESA</h1>
          <p className="mb-4">
            DESA is a platform that helps you to make your decision using Simple
            Additive Weight method.
          </p>
        </div>
        <div className="flex justify-center md:justify-end md:flex-1">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
