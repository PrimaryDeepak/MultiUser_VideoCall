import React, { useState, useCallback } from "react";
import { Layout, Button, notification } from "antd";
import Webcam from "react-webcam";

const { Header } = Layout;

const VideoChat = () => {
    const [cameraError, setCameraError] = useState(false);
    const webcamRef = React.useRef(null);

    const handleUserMediaError = useCallback(() => {
        setCameraError(true);
        notification.error({
            message: "Camera Access Denied",
            description: "Please allow camera access in your browser settings.",
        });
    }, []);

    return (
        <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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

            <div style={{ display: "flex", height: "calc(100% - 66px)" }}>
                {/* Left Section */}
                <div style={{ flex: 1, borderRight: "2px solid black", display: "flex", flexDirection: "column" }}>
                    {/* Video Section */}
                    <div style={{
                        flex: 1,
                        borderBottom: "2px solid black",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        REMOTE VIDEO
                        <div style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "3px",
                            borderRadius: "10px",
                            width: "200px",
                            height: "130px",
                            overflow: "hidden",
                            background: "black",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            {cameraError ? (
                                <p style={{ color: "white" }}>Camera Access Denied</p>
                            ) : (
                                <Webcam
                                    ref={webcamRef}
                                    style={{ width: "100%", height: "100%" }}
                                    onUserMediaError={handleUserMediaError}
                                />
                            )}
                        </div>
                    </div>

                    {/* Chat Section */}
                    <div style={{ height: "150px", display: "flex", flexDirection: "column" }}>
                        <div style={{ flex: 1, padding: "10px" }}>CHAT</div>
                        <div style={{ display: "flex", borderTop: "2px solid black" }}>
                            <input style={{ flex: 1, border: "none", padding: "10px" }} type="text" placeholder="Type a message..." />
                            <button style={{ border: "none", padding: "10px" }}>➤</button>
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div style={{ flex: 1, position: "relative", padding: "10px" }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "2px solid black",
                        paddingBottom: "10px",
                    }}>
                        <Button type="default" style={{ border: "2px solid black", marginRight: "10px" }}>CANVAS</Button>
                        <Button type="primary" shape="circle">+</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default VideoChat;