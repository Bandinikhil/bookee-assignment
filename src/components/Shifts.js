import React, { useEffect } from "react";
import { getAllShifts } from "../utils/api";
import {
  cancelShift,
  setAvailableShifts,
  setLoading,
  setShifts
} from "../utils/shiftsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

const Shifts = () => {
  const myShifts = useSelector((store) => store.shiftslist.myShifts);
  const dispatch = useDispatch();

  const handleCancel = async (shiftId) => {
    console.log(shiftId);
    dispatch(cancelShift(shiftId));
  };

  const formatTime = (dateTime) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }).format(dateTime);
  };

  //To fetch all the Shift details from the API server and dispatch the results to redux store
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await getAllShifts();
        dispatch(setShifts(response));
        dispatch(
          setAvailableShifts(response?.filter((shift) => !shift.booked))
        );
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching shifts:", error);
        dispatch(setLoading(false));
      }
    };

    fetchShifts();
  }, []);

  
  //Grouping shifts by date
  const groupedShiftsByDate = myShifts.reduce((acc, shift) => {
    const shiftDate = new Date(shift.startTime).toLocaleDateString();
    if (!acc[shiftDate]) {
      acc[shiftDate] = [];
    }
    acc[shiftDate].push(shift);
    return acc;
  }, {});

  if (myShifts.length === 0)
    return (
      <>
        <Header />
        <div className="text-blue-600 text-2xl flex items-center justify-center">
          No Shifts, Book from Available Shifts{" "}
        </div>
      </>
    );
  return (
    <div className="lg:mx-10">
      <Header />
      <div className="App">
        <table className="table-auto w-full">
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
                        {formatTime(new Date(shift.startTime))} -{" "}
                        {formatTime(new Date(shift.endTime))}
                        <p className="text-gray-500">{shift.area}</p>
                      </td>

                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleCancel(shift.id)}
                          className="ml-2 px-4 py-1 rounded-full border-2 border-red-500 text-red-500"
                        >
                          Cancel
                        </button>
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
  );
};

export default Shifts;
