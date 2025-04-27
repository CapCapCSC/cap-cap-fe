import React from 'react';

const QuizHistory = ({ quizHistory, badges, vouchers, quizCurrentPage, quizItemsPerPage, totalQuizPages, handleQuizPageChange, handleVoucherClick }) => {
    if (!quizHistory || quizHistory.length === 0) {
        return <div className="py-4 text-center text-gray-500">Bạn hiện chưa làm quiz nào</div>;
    }
    // Calculate pagination indices
    const startIndex = (quizCurrentPage - 1) * quizItemsPerPage;
    const endIndex = startIndex + quizItemsPerPage;
    const currentItems = quizHistory.slice(startIndex, endIndex);

    return (
        <div className="py-4">
            <h3 className="text-lg font-medium mb-4">Lịch sử làm quiz</h3>
            <div className="space-y-4">
                {currentItems.map((quiz) => {
                    // Format dates
                    const startDate = new Date(quiz.startedAt);
                    const formattedDate = startDate.toLocaleDateString('vi-VN');
                    const formattedTime = startDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                    // Format time spent
                    const minutes = Math.floor(quiz.timeSpent / 60);
                    const seconds = quiz.timeSpent % 60;
                    const formattedTimeSpent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

                    // Get badge and voucher info
                    const badge = badges.find((b) => b._id === quiz.rewards.badge);
                    const voucher = vouchers.find((v) => v._id === quiz.rewards.voucher);

                    return (
                        <div key={quiz._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between">
                                <div>
                                    <h4 className="font-medium">Quiz #{quiz.quizId.substring(4)}</h4>
                                    <p className="text-sm text-gray-500">
                                        {formattedDate} - {formattedTime}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-lg font-bold text-red-600">
                                        {quiz.score}/{quiz.totalQuestions}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Thời gian: {formattedTimeSpent}
                                    </div>
                                </div>
                            </div>

                            {(badge || voucher) && (
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <p className="text-sm font-medium mb-2">Phần thưởng:</p>
                                    <div className="flex items-center gap-3">
                                        {badge && (
                                            <div className="flex items-center gap-1">
                                                <img src={badge.iconUrl} alt={badge.name} className="w-6 h-6 rounded-full" />
                                                <span className="text-sm">{badge.name}</span>
                                            </div>
                                        )}
                                        {voucher && (
                                            <div 
                                                className="flex items-center gap-1 text-sm bg-blue-50 px-2 py-1 rounded-md cursor-pointer hover:bg-blue-100"
                                                onClick={() => handleVoucherClick(voucher)}
                                            >
                                                <span>🎫</span>
                                                <span>{voucher.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
                <div className="flex space-x-2">
                    <button 
                        onClick={() => handleQuizPageChange(quizCurrentPage > 1 ? quizCurrentPage - 1 : 1)}
                        className={`px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 ${quizCurrentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={quizCurrentPage === 1}
                    >
                        &laquo;
                    </button>
                    <button 
                        onClick={() => handleQuizPageChange(1)}
                        className={`px-3 py-1 border border-gray-300 rounded ${quizCurrentPage === 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                    >
                        1
                    </button>
                    <button 
                        onClick={() => handleQuizPageChange(2)}
                        className={`px-3 py-1 border border-gray-300 rounded ${quizCurrentPage === 2 ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} cursor-pointer`}
                    >
                        2
                    </button>
                    <button 
                        onClick={() => handleQuizPageChange(quizCurrentPage < totalQuizPages ? quizCurrentPage + 1 : totalQuizPages)}
                        className={`px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50 ${quizCurrentPage === totalQuizPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={quizCurrentPage === totalQuizPages}
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizHistory; 