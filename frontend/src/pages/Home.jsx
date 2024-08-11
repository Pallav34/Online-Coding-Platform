
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-poppins p-6">
      {/* Greeting Heading */}
      <h1 className="text-4xl font-bold mb-8">
        Hi User! What do you want to do today?
      </h1>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Coding Playground Card */}
        <Link to="/coding-playground" className="card">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Coding Playground</h2>
            <p className="text-gray-400">
              Dive into a versatile coding environment where you can experiment and build with ease.
            </p>
          </div>
        </Link>
        
        {/* Coding Arena Card */}
        <Link to="/coding-arena" className="card">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Coding Arena</h2>
            <p className="text-gray-400">
              Challenge yourself in a competitive setting and sharpen your coding skills.
            </p>
          </div>
        </Link>
        
        {/* Coding BattleGround Card */}
        <Link to="/coding-battleground" className="card">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
            <h2 className="text-2xl font-bold mb-4">Coding BattleGround</h2>
            <p className="text-gray-400">
              Take on tough coding problems and prove your prowess in a battleground of code.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
