import React from "react";

const sizeGuides = {
  footwear: (
    <table className="w-full text-sm border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th>Size (India)</th>
          <th>Foot Length (cm)</th>
          <th>US Size</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {[["35", "22.8", "5", "Petite"], ["36", "23.5", "6", "Narrow fit"], ["37", "24.1", "6.5–7", "Standard"], ["38", "24.8", "7.5–8", "Most common"], ["39", "25.4", "8.5", "Slightly roomy"], ["40", "26.0", "9", "Comfortable fit"], ["41", "26.7", "9.5–10", "Wide feet"]].map((row, i) => (
          <tr key={i} className="text-center border-t">
            {row.map((cell, j) => (
              <td key={j} className="py-2 px-4 border">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),

hats: (
  <table className="w-full text-sm border border-gray-300">
    <thead className="bg-gray-100">
      <tr>
        <th>US Hat Size</th>
        <th>Head Circumference (cm)</th>
        <th>Head Circumference (inches)</th>
        <th>Fit</th>
      </tr>
    </thead>
    <tbody>
      {[
        ["6 3/4", "54", "21.3", "Petite / Teens"],
        ["6 7/8", "55", "21.7", "Small (Women)"],
        ["7", "56", "22.0", "Small-Medium"],
        ["7 1/8", "57", "22.4", "Medium (Common)"],
        ["7 1/4", "58", "22.8", "Medium-Large"],
        ["7 3/8", "59", "23.2", "Large (Men)"],
        ["7 1/2", "60", "23.6", "X-Large / Loose Fit"],
      ].map((row, i) => (
        <tr key={i} className="text-center border-t">
          {row.map((cell, j) => (
            <td key={j} className="py-2 px-4 border">{cell}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
),


  rings: (
    <table className="w-full text-sm border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th>US Size</th>
          <th>Diameter (mm)</th>
          <th>Circumference (mm)</th>
          <th>Suggested Finger</th>
        </tr>
      </thead>
      <tbody>
        {[["5", "15.7", "49.3", "Petite"], ["6", "16.5", "51.8", "Slim fingers"], ["7", "17.3", "54.4", "Standard"], ["8", "18.1", "57.0", "Ring/Middle"], ["9", "19.0", "59.5", "Larger fingers"]].map((row, i) => (
          <tr key={i} className="text-center border-t">
            {row.map((cell, j) => (
              <td key={j} className="py-2 px-4 border">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),

  glasses: (
    <table className="w-full text-sm border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th>Size</th>
          <th>Lens Width</th>
          <th>Bridge Width</th>
          <th>Temple Length</th>
          <th>Face Suggestion</th>
        </tr>
      </thead>
      <tbody>
        {[["Small", "45–50 mm", "14–17 mm", "135–140 mm", "Petite faces"], ["Medium", "51–54 mm", "16–18 mm", "140–145 mm", "Oval/average faces"], ["Large", "55–58 mm", "17–20 mm", "145–150 mm", "Round/broad faces"], ["Oversized", "59+ mm", "18+ mm", "150+ mm", "Bold looks"]].map((row, i) => (
          <tr key={i} className="text-center border-t">
            {row.map((cell, j) => (
              <td key={j} className="py-2 px-4 border">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

const SizeGuideModal = ({ category, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">📏 Size Guide - {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-lg font-bold">&times;</button>
        </div>
        <div className="overflow-x-auto max-h-[400px]">{sizeGuides[category] || <p>No guide available for this category.</p>}</div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
