import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookShift } from "../utils/api";
import { cancelShift, setMyShifts } from "../utils/shiftsSlice";
import Header from "./Header";

const AvailableShifts = () => {
  const dispatch = useDispatch();
  const availableShifts = useSelector(
    (store) => store.shiftslist.availableShifts
  );
  const bookedShifts = useSelector((store) => store.shiftslist.myShifts);

  const [currentCity, setCurrentCity] = useState("Helsinki");

  const cities = ["Helsinki", "Turku", "Tampere"];

  //Filter shifts by cities
  const filterShiftsByCity = (city) =>
    availableShifts.filter((shift) => shift.area === city);

  const handleCancel = async (shiftId) => {
    console.log(shiftId);
    dispatch(cancelShift(shiftId));
  };

  const handleClick = async (shiftId) => {
    console.log(shiftId);

    try {
      const bookedShift = await bookShift(shiftId);
      console.log("Successfully booked shift:", bookedShift);
      dispatch(setMyShifts(bookedShift));
    } catch (error) {
      console.error("Error booking shift:", error);
    }
  };

  const isDateDisabled = (shiftDate) => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const shiftDateTime = new Date(shiftDate).setHours(0, 0, 0, 0);
    return shiftDateTime < currentDate;
  };

  const isShiftBooked = (shift) =>
    bookedShifts.some((bookedShift) => bookedShift.id === shift.id);

  const groupedShiftsByDate = filterShiftsByCity(currentCity).reduce(
    (acc, shift) => {
      const shiftDate = new Date(shift.startTime).toLocaleDateString();
      acc[shiftDate] = acc[shiftDate] || [];
      acc[shiftDate].push(shift);
      return acc;
    },
    {}
  );

  const formatTime = (dateTime) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true // Use 12-hour clock
    }).format(dateTime);
  };

  return (
    <>
      <div className="lg:mx-10">
        <Header />
        <div className="container mx-auto p-4">
          <div className="flex flex-wrap mb-4">
            {cities.map((city) => (
              <button
                key={city}
                className={`px-4 py-2 m-2 rounded ${
                  currentCity === city
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setCurrentCity(city)}
              >
                {city} ({filterShiftsByCity(city).length})
              </button>
            ))}
          </div>

          <table className="w-full">
            <tbody>
              {Object.entries(groupedShiftsByDate).map(
                ([date, shifts], index) => (
                  <React.Fragment key={index}>
                    <tr className="bg-gray-300">
                      <td colSpan="3" className="border px-4 py-2 font-bold">
                        {date === new Date().toLocaleDateString()
                          ? "Today"
                          : date}
                      </td>
                    </tr>
                    {shifts.map((shift, shiftIndex) => (
                      <tr key={shiftIndex} className="bg-white">
                        <td className="border px-4 py-2">
                          {/* {new Date(shift.startTime).toLocaleTimeString()} -{" "}
                    {new Date(shift.endTime).toLocaleTimeString()} */}
                          {formatTime(new Date(shift.startTime))} -{" "}
                          {formatTime(new Date(shift.endTime))}
                        </td>
                        <td className="border px-4 py-2">
                          {isShiftBooked(shift) && (
                            <span className="mr-2">Booked</span>
                          )}
                          {isShiftBooked(shift) ? (
                            <button
                              onClick={() => handleCancel(shift.id)}
                              className="ml-2 px-4 py-1 rounded-full border-2 border-red-500 text-red-500"
                            >
                              Cancel
                            </button>
                          ) : (
                            <button
                              onClick={() => handleClick(shift.id)}
                              className={`ml-2 px-2 py-1 rounded ${
                                isDateDisabled(shift.startTime)
                                  ? "bg-gray-300 cursor-not-allowed"
                                  : "ml-2 px-4 py-1 rounded-full border-2 border-green-500 text-green-500"
                              }`}
                              disabled={isDateDisabled(shift.startTime)}
                            >
                              Book
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AvailableShifts;
