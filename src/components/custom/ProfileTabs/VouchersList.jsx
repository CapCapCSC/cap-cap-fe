import React from 'react';

const VouchersList = ({ vouchers, handleVoucherClick }) => {
    if (!vouchers || vouchers.length === 0) {
        return <div className="py-4 text-center text-gray-500">Bạn hiện chưa có voucher nào</div>;
    }
    return (
        <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Voucher của bạn</h3>
            <div className="space-y-4">
                {vouchers.map(voucher => {
                    const validUntil = new Date(voucher.validUntil);
                    const formattedDate = validUntil.toLocaleDateString('vi-VN');
                    return (
                        <div 
                            key={voucher._id} 
                            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => handleVoucherClick(voucher)}
                        >
                            <div>
                                <h4 className="font-medium">{voucher.name}</h4>
                                <p className="text-sm text-gray-500">Áp dụng tại: {voucher.applicableRestaurants.map(r => r.name).join(', ')}</p>
                                <p className="text-sm text-gray-500">Hết hạn: {formattedDate}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VouchersList; 