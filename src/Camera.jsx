import React, { useEffect, useRef } from "react";
import { Layout } from "antd";

const { Header } = Layout;

function VideoCall() {
    const myScreen = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            if (myScreen.current) {
                myScreen.current.srcObject = stream;
            }
        }).catch(error => console.error("Error accessing webcam:", error));
    }, []);

    return (
        <Layout style={{ height: "100vh", overflow: "hidden" }}>
            {/* Header */}
            <Header style={{
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                background: "#001529",
                height: "66px",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
            }}>
                LyfLeap
            </Header>

            {/* Main Content */}
            <div style={{ display: "flex", height: "calc(100vh - 66px)" }}>
                {/* Left Section (60% Width, Full Height) */}
                <div style={{
                    flex: 0.6,
                    borderRight: "2px solid black",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}>
                    {/* Video Section */}
                    <div
                        style={{
                            flex: 0.7,
                            borderBottom: "2px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <video
                            ref={myScreen}
                            style={{
                                border: "1px solid black",
                                borderRadius: "10px",
                                width: "300px",
                                height: "200px",
                            }}
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div style={{ flex: 0.4, display: "flex", justifyContent: "center", alignItems: "center" }}>
                </div>
            </div>
        </Layout>
    );
}

export default VideoCall;
