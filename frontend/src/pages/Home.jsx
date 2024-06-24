import React, { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Header from "../components/common/Header"
import Sidebar from "../components/common/Sidebar"

import "../styles/Home.css"
import { Outlet, useNavigate } from "react-router-dom"
import { getStats } from "../apis/taskApis"
import { useDispatch, useSelector } from "react-redux"
import { setStats } from "../app/features/statsSlice"
import { selectFetchAgainStatus } from "../app/features/fetchAgainSlice"
import { fetchUserByEmail, fetchUserById } from "../apis/authApis"
import { selectUser, setUser } from "../app/features/userSlice"
import { selectToken } from "../app/features/authSlice"

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token?.accessToken == undefined || token?.refreshToken == undefined) {
            navigate('/', {replace: true});
        }
    }, [])

    return (
        <Container fluid className="p-0 h-screen vh-100 -primary overflow-hidden ">
            <Row className="m-0 h-100">
                <Col className="col-12 p-0 h-auto">
                    <Header />
                </Col>
                <Col id="main-container" md={12} className="p-0">
                    <Row className="m-0 h-100">
                        <Col className="col-0 col-md-2 p-0">
                            <Sidebar />
                        </Col>
                        <Col className="p-2 col-12 col-md-10 overflow-auto" style={{height: "100%"}}>
                            <Outlet />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Home