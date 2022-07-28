import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { UserContext } from "../context";

const Login = () =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    const [state, setState] = useContext(UserContext);

    const router = useRouter();

    //send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {
                email, 
                password
            });
            setState({
                user: data.user,
                token: data.token
            });
            //save in local storage
            window.localStorage.setItem('auth', JSON.stringify(data));
            setEmail("");
            setPassword("");
            setOk(data.ok); 
            setLoading(false); 
            router.push("/dashboard");
        } catch (error) {
            toast.error(error.response.data);
            setLoading(false); 
        }
    }

    return (
        <div className="container-fluid masthead">
            <div className="container h-75">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Sign In</h3>
                                <form className="px-md-2" onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                                    <label className="form-label" htmlFor="email">Email</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <label className="form-label" htmlFor="password">password</label>
                                </div>
                                <button type="submit" disabled={!email || !password} className="submitBtn col-12">
                                    { loading ? <SyncOutlined spin className="py-1"/> : "Login" }
                                </button>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-center">
                                            Not yet registered?{" "}
                                            <Link href="/register">
                                                <a style={{color: "#64a19d", textDecoration:"underline"}}>Register Now</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;