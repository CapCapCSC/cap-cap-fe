import Footer from '@/components/custom/Footer';
import HeroSection from '@/components/custom/HeroSection';
import StatsSection from '@/components/custom/StatsSection';
import AboutContactSection from '@/components/custom/AboutContactSection';
import { getRandomFoods } from '@/services/foodService';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const [loading, setLoading] = useState(false);
    const [randomData, setRandomData] = useState({ food: null, restaurants: [] });

    const handleClick = async () => {
        setLoading(true);
        try {
            const element = document.getElementById('random-food');
            element?.scrollIntoView({ behavior: 'smooth' });
            const result = await getRandomFoods();
            setRandomData(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <StatsSection/>
            <div id="random-food" className="w-screen flex flex-col items-center justify-center p-4 pb-16">
                <h3 className="font-lobster text-5xl font-semibold mb-4 text-center text-red-600">Hôm nay cạp gì?</h3>
                {!randomData.food ? (
                    <button
                        onClick={handleClick}
                        className="cursor-pointer p-6 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300"
                        disabled={loading}
                    >
                        <img
                            src="https://em-content.zobj.net/source/facebook/327/hippopotamus_1f99b.png"
                            alt="Hippopotamus"
                            className="w-12 h-12"
                        />
                    </button>
                ) : (
                    <div className="flex items-start justify-center w-full max-w-4xl gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-md flex-1">
                            <h2 className="text-2xl font-semibold mb-2 text-center">{randomData.food.name}</h2>
                            <img
                                src={randomData.food.imgUrl}
                                alt={randomData.food.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <p className="text-gray-700 mb-4">{randomData.food.description}</p>
                            <h3 className="font-medium mb-2">Địa điểm tới cạp:</h3>
                            <ul className="list-disc list-inside">
                                {randomData.restaurants.map(r => (
                                    <li key={r._id} className="mb-1">
                                        <span className="font-semibold">{r.name}</span> - {r.address} - <span className="text-red-600">{new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND'}).format(r.menu[0].price)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={handleClick}
                            className="cursor-pointer p-6 bg-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 flex-none"
                            disabled={loading}
                        >
                            <img
                                src="https://em-content.zobj.net/source/facebook/327/hippopotamus_1f99b.png"
                                alt="Hippopotamus"
                                className="w-12 h-12"
                            />
                        </button>
                    </div>
                )}
            </div>
            <AboutContactSection />
            <Footer />
        </div>
    );
}

export default HomePage; 