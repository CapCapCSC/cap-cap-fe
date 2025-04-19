import { useState } from "react";

import Navbar from '@/components/custom/Navbar';
import LoginCard from '../components/custom/LoginCard';


const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="">
            <Navbar />
            <div className='mt-24 flex items-center justify-center'>
                <LoginCard
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}/>
            </div>
        </div>
    );
}

export default LoginPage;