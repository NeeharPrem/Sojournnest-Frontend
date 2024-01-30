import React, { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";

interface StateData {
  state: string;
  districts: string[];
}

interface StateDistrictDropdownProps {
  onSelectState: (selectedState: string, selectedDistrict: string) => void;
}

const url = "https://api.npoint.io/ebc716fd6e85da66e773";

const StateDistrictDropdown: React.FC<StateDistrictDropdownProps> = ({
  onSelectState
}) => {
  const [states, setStates] = useState<StateData[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const {
    data: userData,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetch(url).then((response) => response.json()),
  });

  useEffect(() => {
    if (userData && userData.states) {
      setStates(userData.states);
    }
  }, [userData]);

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

    const selectedStateData = states.find(
      (stateData) => stateData.state === selectedState,
    );
    if (selectedStateData) {
      setDistricts(selectedStateData.districts);
    } else {
      setDistricts([]);
    }
  };

  const districtHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
    onSelectState(selectedState, event.target.value);
  };

  return (
    <div>
      <div>
        <label htmlFor="state">State:</label>
        <select
          id="state"
          className="ml-2 pl-3 border w-40 focus:outline-blue-gray-300 text-center"
          value={selectedState}
          onChange={handleStateChange}
        >
          <option value="">---select---</option>
          {states.map((stateData) => (
            <option key={stateData.state} value={stateData.state}>
              {stateData.state}
            </option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="mt-3">
          <label htmlFor="district">District:</label>
          <select
            id="district"
            className="ml-2 pl-3 border w-40 focus:outline-blue-gray-300 text-center"
            value={selectedDistrict}
            onChange={districtHandle}
          >
            <option value="">---select---</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StateDistrictDropdown;
