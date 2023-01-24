import {Outlet, useNavigate} from 'react-router-dom'
import Button from "@mui/material/Button";
import {useEffect} from "react";

function Navbar() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('check')) navigate('/');
    }, [navigate]);
    const logout = () => {
        localStorage.removeItem('check');
        navigate('/');
    }

    return (
        <>
            <nav>
                <div className="flex justify-end bg-black">
                    <Button variant="outlined" sx={{color:'orange', borderColor:'orange', fontSize: 16}} onClick={logout}>
                        Logout
                    </Button>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar;