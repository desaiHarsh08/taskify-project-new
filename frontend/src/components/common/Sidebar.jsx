import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const sideNavArr = [
        // { path: "/home", label: "History", icon: <GoWorkflow /> },
        { path: "/home", label: "Home", icon: <RiHomeOfficeLine /> },
        { path: "tasks", label: "All Task", icon: <GoWorkflow /> },
        { path: "customers", label: "Customers", icon: <IoIosPeople /> },
        { path: "settings", label: "Settings", icon: <IoSettingsOutline /> },
        { path: "/", label: "Logout", icon: <RiLogoutBoxLine /> },
    ];



    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100">
            <ul className="nav nav-pills flex-column mb-auto" style={{ fontSize: "16px" }}>
                {sideNavArr.map((link) => {
                    if (link.label === "Logout") {
                        // localStorage.clear();
                        return (
                            <li key={`sidelink-${link.path}`} className="nav-item d-flex px-5">
                                <Link to={link.path} className="nav-link text-light acti ve d-flex gap-2 align-items-center" aria-current="page">
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </li>
                        );
                    }
                    return (
                        <li key={`sidelink-${link.path}`} className="nav-item d-flex px-5">
                            <Link to={link.path} className="nav-link text-light acti ve d-flex gap-2 align-items-center" aria-current="page">
                                {link.icon}
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Sidebar