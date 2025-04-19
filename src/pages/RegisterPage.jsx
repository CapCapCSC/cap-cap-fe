import { useState } from "react";

import { Toaster } from "@/components/ui/sonner"

import Navbar from '@/components/custom/Navbar';
import RegisterCard from "@/components/custom/RegisterCard";


const RegisterPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <Navbar />
            <div className='mt-24 flex items-center justify-center'>
                <RegisterCard
                    username={username}
                    setUsername={setUsername}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword} />
            </div>
            <Toaster />
        </div>
    );
}

export default RegisterPage;