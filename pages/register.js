import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import { SyncOutlined } from '@ant-design/icons';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [ok, setOk] = useState(false);
    const [loading, setLoading] = useState(false);

    //send data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
            name, 
            email, 
            password, 
            number  //when key-value is same
        });
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        setOk(data.ok); 
        setLoading(false); 
        } catch (error) {
            toast.error(error.response.data);
            setLoading(false); 
        }
    };   

    return (
        <div className="container-fluid masthead">
            <div className="row py-5  text-light">
                
            </div>

                <div className="container h-75">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3">
                        <div className="card-body p-4 p-md-5">
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <form className="px-md-2" onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example1q" className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                                    <label className="form-label" htmlFor="form3Example1q">Name</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example1q" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/> 
                                    <label className="form-label" htmlFor="form3Example1q">Email</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="form3Example1q" className="form-control" value={password} onChange={e => setPassword(e.target.value)}/>
                                    <label className="form-label" htmlFor="form3Example1q">Password</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="form3Example1q" className="form-control" value={number} onChange={e => setNumber(e.target.value)}/>
                                    <label className="form-label" htmlFor="form3Example1q">Mobile Number</label>
                                </div>
                                <button type="submit" disabled={!name || !email || !password} className="submitBtn col-12">
                                    { loading ? <SyncOutlined spin className="py-1"/> : "Submit" }
                                </button>
                                <div className="row">
                                    <div className="col">
                                        <p className="text-center">
                                            Already registered?{" "}
                                            <Link href="/login">
                                                <a style={{color: "#64a19d", textDecoration:"underline"}}>Login</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Modal title="Congratulations" visible={ok} onCancel={() => setOk(false)} footer={null}>
                                <p>You have successfully registered!</p>
                                <Link href="/login">
                                    <a className="submitBtn col-3">Login</a>
                                </Link>
                            </Modal>
                        </div>
                    </div>

                </div>
      

        </div>
    );
};

export default Register;