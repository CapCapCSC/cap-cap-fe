import React from 'react';
import { Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderMaintenance = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
                <div className="flex justify-center mb-6">
                    <Wrench className="h-16 w-16 text-red-500 animate-bounce" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Đang bảo trì
                </h1>
                <p className="text-gray-600 mb-8">
                    Chúng tôi đang nâng cấp hệ thống để mang đến trải nghiệm tốt hơn. 
                    Vui lòng quay lại sau!
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="cursor-pointer px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
};

export default UnderMaintenance;
