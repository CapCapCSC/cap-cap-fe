

const FoodCard = ({name, description, ingredients, imgUrl, tags, price}) => {
    return (
        <div className="border border-red-300 rounded-lg shadow-md p-4">
            <img
            src={imgUrl}
            alt={name}
            className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-600 mb-2">
                {description}
            </p>
            <div className="flex justify-between items-center mt-2">

            {/* Tag */}
            {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, index) => (
                <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                >
                    {tag}
                </span>
                ))}
            </div>
            )}

            {/* Giá */}
            {price && (
                <span className="font-semibold text-red-500">{price}</span>
            )}
            </div>
        </div>
    );
}

export default FoodCard;