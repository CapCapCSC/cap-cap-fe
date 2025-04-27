import React from 'react';

const BadgesList = ({ badges, handleBadgeClick }) => {
    if (!badges || badges.length === 0) {
        return <div className="py-4 text-center text-gray-500">Bạn hiện chưa có huy hiệu nào</div>;
    }
    return (
        <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Huy hiệu của bạn</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {badges.map(badge => (
                    <div key={badge._id} className="flex flex-col items-center">
                        <div 
                            className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-200"
                            onClick={() => handleBadgeClick(badge)}
                        >
                            <img 
                                src={badge.iconUrl} 
                                alt={badge.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-sm">{badge.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BadgesList; 