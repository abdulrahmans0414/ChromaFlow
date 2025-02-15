import { useState } from "react";

function App() {
  const [color, setColor] = useState("#000000"); // Default background color (black)
  const [isGradient, setIsGradient] = useState(false); // Toggle for gradient background
  const [gradientColors, setGradientColors] = useState(["#FF0000", "#00FF00"]); // Gradient colors
  const [gradientDirection, setGradientDirection] = useState("to right"); // Gradient direction
  const [favorites, setFavorites] = useState([]); // Favorite colors
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle

  // Function to handle color change from color picker
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Function to generate a random color
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setColor(randomColor);
  };

  // Function to toggle gradient background
  const toggleGradient = () => {
    setIsGradient(!isGradient);
  };

  // Function to add current color to favorites
  const addToFavorites = () => {
    if (!favorites.includes(color)) {
      setFavorites([...favorites, color]);
    }
  };

  // Function to copy color code to clipboard
  const copyColorCode = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied: ${color}`);
  };

  // Function to handle gradient color change
  const handleGradientColorChange = (index, value) => {
    const newGradientColors = [...gradientColors];
    newGradientColors[index] = value;
    setGradientColors(newGradientColors);
  };

  // Function to handle gradient direction change
  const handleGradientDirectionChange = (direction) => {
    setGradientDirection(direction);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`w-full h-screen duration-1000 transition-all ${isDarkMode ? "text-white" : "text-black"
        }`}
      style={{
        background: isGradient
          ? `linear-gradient(${gradientDirection}, ${gradientColors.join(", ")})`
          : color,
      }}
    >
      {/* Controls Container */}
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white/30 backdrop-blur-sm px-4 py-3 rounded-3xl">
          {/* Color Picker */}
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="w-10 h-10 cursor-pointer"
          />

          {/* Random Color Button */}
          <button
            onClick={generateRandomColor}
            className="outline-none px-4 py-2 rounded-3xl text-white bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            Random
          </button>

          {/* Gradient Toggle Button */}
          <button
            onClick={toggleGradient}
            className={`outline-none px-4 py-2 rounded-3xl text-white ${isGradient ? "bg-purple-500" : "bg-gray-800"
              } hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg`}
          >
            {isGradient ? "Disable Gradient" : "Enable Gradient"}
          </button>

          {/* Copy Color Code Button */}
          <button
            onClick={copyColorCode}
            className="outline-none px-4 py-2 rounded-3xl text-white bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            Copy Color
          </button>

          {/* Add to Favorites Button */}
          <button
            onClick={addToFavorites}
            className="outline-none px-4 py-2 rounded-3xl text-white bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            Add to Favorites
          </button>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="outline-none px-4 py-2 rounded-3xl text-white bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Gradient Controls (Visible if Gradient is Enabled) */}
      {isGradient && (
        <div className="fixed top-12 inset-x-0 flex flex-wrap justify-center gap-3 px-2">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white/30 backdrop-blur-sm px-4 py-3 rounded-3xl">
            {gradientColors.map((gradientColor, index) => (
              <input
                key={index}
                type="color"
                value={gradientColor}
                onChange={(e) => handleGradientColorChange(index, e.target.value)}
                className="w-10 h-10 cursor-pointer"
              />
            ))}
            <select
              value={gradientDirection}
              onChange={(e) => handleGradientDirectionChange(e.target.value)}
              className="outline-none px-4 py-2 rounded-3xl bg-gray-800 text-white"
            >
              <option value="to right">To Right</option>
              <option value="to left">To Left</option>
              <option value="to bottom">To Bottom</option>
              <option value="to top">To Top</option>
              <option value="to bottom right">To Bottom Right</option>
              <option value="to top left">To Top Left</option>
            </select>
          </div>
        </div>
      )}

      {/* Favorites Section */}
      <div className="fixed top-24 inset-x-0 flex flex-wrap justify-center gap-3 px-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white/30 backdrop-blur-sm px-4 py-3 rounded-3xl">
          {favorites.map((favColor, index) => (
            <div
              key={index}
              className="w-10 h-10 rounded-full cursor-pointer"
              style={{ backgroundColor: favColor }}
              onClick={() => setColor(favColor)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;