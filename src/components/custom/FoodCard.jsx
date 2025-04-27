const FoodCard = ({name, description, imgUrl, tags, price}) => {
    return (
        <div className="border border-red-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-200 cursor-pointer transform hover:-translate-y-1">
            <img
            src={imgUrl}
            alt={name}
            className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">
                {description?.slice(0, 60)}...
            </p>
            <div className="flex justify-between items-center mt-2">

            {/* Tag */}
            {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tagObj, index) => (
                <span
                    key={index}
                    className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: tagObj.color, color: 'white' }}
                >
                    {tagObj.name}
                </span>
                ))}
            </div>
            )}

            {/* Giá */}
            {price && (
                <span className="font-semibold text-red-500">{price.toLocaleString('vi-VN')} đ</span>
            )}
            </div>
        </div>
    );
}

export default FoodCard;