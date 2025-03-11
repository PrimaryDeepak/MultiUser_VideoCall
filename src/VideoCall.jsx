import React, { useEffect, useRef, useState } from "react";
import { Button, Flex, Layout, message } from "antd";
import { VideoCamera } from "./Icons/VideoCamera";
import { OutlineMicNone } from "./Icons/Mic";
import { ScreenBroadcast } from "./Icons/ScreenShare";
import { BaselineExitToApp } from "./Icons/Exit";
import { VideoCameraOff } from "./Icons/VideoCameraOff";
import { OutlineMicOff } from "./Icons/MicOff";
import Participant from "./components/Participant";

const { Header } = Layout;

function VideoCall() {
    const myScreen = useRef(null);
    const [stream, setStream] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);
    const [participants, setParticipants] = useState([{},{},{},{},{}])

    useEffect(() => {
        startWebcam();
        return () => stopStream();
    }, []);

    const startWebcam = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (myScreen.current) myScreen.current.srcObject = userStream;
            setStream(userStream);
            setParticipants(prev => [...prev, { id: "me", stream: userStream }]);
        } catch (error) {
            console.error("Error accessing webcam:", error);
            message.error("Failed to access camera or microphone.");
        }
    };

    const stopStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const toggleCamera = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setVideoEnabled(videoTrack.enabled);
            }
        }
    };

    const toggleAudio = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setAudioEnabled(audioTrack.enabled);
            }
        }
    };

    const toggleScreenShare = async () => {
        if (!screenSharing) {
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                if (myScreen.current) {
                    myScreen.current.srcObject = screenStream;
                }
                setStream(screenStream);
                setScreenSharing(true);

                // Stop screen sharing when the user stops it manually
                screenStream.getVideoTracks()[0].onended = () => {
                    stopStream();
                    startWebcam();
                    setScreenSharing(false);
                };
            } catch (error) {
                console.error("Error sharing screen:", error);
                message.error("Failed to share screen.");
            }
        } else {
            stopStream();
            startWebcam();
            setScreenSharing(false);
        }
    };

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


            {/*Main Content*/}
            <Flex vertical style={{ display: "flex", height: "calc(100vh - 70px)" }}>
                <Flex vertical style={{ width: "63%", backgroundColor: "#f0f2f5" }}>
                    {/*Top Flex*/}
                    <Flex horizontal justify="space-between" align="center" style={{ height: "55px" }}>
                        <Flex vertical style={{ marginLeft: "10px" }}>
                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>fmakmkmcamakmk</span>
                            <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                        </Flex>
                        <Flex>
                            <Button style={{ borderRadius: "20px", color: "blue", height: "38px", marginRight: "8px" }}> Share meeting link</Button>
                        </Flex>
                    </Flex>

                    {/*2nd Flex*/}
                    <Flex justify="center" align="center" style={{ height: "430px" }}>
                        <Participant stream={stream} />
                    </Flex>

                    {/*3rd Flex*/}
                    <Flex horizontal justify="space-around" align="center" style={{ height: "175px", marginLeft: "25px", marginRight: "25px" }}>
                        {participants.slice(0, 3).map((participant, index) => (
                            <video
                                key={participant.id}
                                ref={index === 0 ? myScreen : null}
                                srcObject={participant.stream}
                                style={{
                                    borderRadius: "10px",
                                    width: "194px",
                                    height: "146px",
                                    background: "black",
                                }}
                                autoPlay
                                playsInline
                            ></video>
                        ))}

                        {/* Last video slot shows either a video or "+X" */}
                        {participants.length > 4 ? (
                            <div
                                style={{
                                    borderRadius: "10px",
                                    width: "195px",
                                    height: "146px",
                                    background: "black",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                }}
                            >
                                +{participants.length - 3}
                            </div>
                        ) : (
                            participants[3] && (
                                <video
                                    key={participants[3].id}
                                    srcObject={participants[3].stream}
                                    style={{
                                        borderRadius: "10px",
                                        width: "195px",
                                        height: "146px",
                                        background: "black",
                                    }}
                                    autoPlay
                                    playsInline
                                ></video>
                            )
                        )}
                    </Flex>


                    {/*Bottom Flex*/}
                    <Flex justify="center" gap={30} style={{ height: "55px" }}>
                        <Button shape="circle" type={videoEnabled ? "" : "primary"} danger={!videoEnabled} icon={videoEnabled ? <VideoCamera style={{ fontSize: "21px" }} /> : <VideoCameraOff style={{ fontSize: "21px" }} />} size="large" onClick={toggleCamera} />
                        <Button shape="circle" type={audioEnabled ? "" : "primary"} danger={!audioEnabled} icon={audioEnabled ? <OutlineMicNone style={{ fontSize: "21px" }} /> : <OutlineMicOff style={{ fontSize: "21px" }} />} size="large" onClick={toggleAudio} />
                        <Button shape="circle" icon={<ScreenBroadcast style={{ fontSize: "19px" }} />} size="large" onClick={toggleScreenShare} />
                        <Button type="primary" danger shape="circle" icon={<BaselineExitToApp style={{ fontSize: "21px" }} />} size="large" />
                    </Flex>
                </Flex>
            </Flex>
        </Layout>
    );
}

export default VideoCall;
