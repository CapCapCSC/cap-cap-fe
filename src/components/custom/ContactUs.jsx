import { Phone, Mail, MapPin } from "lucide-react";

function ContactUs() {
    return (
        <div className="my-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Contact us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
            <Phone className="text-red-600" size={20} />
            <div>
                <p className="text-sm text-gray-700">Cạp Cạp</p>
            </div>
            </div>
            
            <div className="flex items-center space-x-3">
            <Mail className="text-red-600" size={20} />
            <div>
                <p className="text-sm text-gray-700">Email: capcap@gmail.com</p>
            </div>
            </div>
            
            <div className="flex items-center space-x-3">
            <MapPin className="text-red-600" size={20} />
            <div>
                <p className="text-xs text-gray-500">Address: ABC XYZ</p>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ContactUs; 