import React from 'react';

const CheckInHistory = ({ checkInsData, activeCheckInId, handleCheckInClick }) => {
    if (!checkInsData || checkInsData.length === 0) {
        return <div className="py-4 text-center text-gray-500">Bạn hiện chưa có lịch sử checkin</div>;
    }
    return (
        <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-1 bg-gray-200"></div>

            {/* Check-in items */}
            <div className="space-y-6">
                {checkInsData.map((checkIn) => (
                    <div key={checkIn.id} className="flex items-center gap-4">
                        <div className="w-24 text-sm text-gray-600">{checkIn.date}</div>
                        <div 
                            onClick={() => handleCheckInClick(checkIn.id)}
                            className={`w-6 h-6 rounded-full z-10 flex items-center justify-center cursor-pointer transition-colors duration-200 ${activeCheckInId === checkIn.id ? 'bg-red-500' : 'bg-gray-300 hover:bg-gray-400'}`}
                        ></div>
                        <div className="flex-1">
                            {activeCheckInId === checkIn.id && 
                                <div className="text-md transition-opacity duration-200">{checkIn.location}</div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckInHistory; 