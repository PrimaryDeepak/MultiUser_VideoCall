import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { OutlineMicNone } from "../Icons/Mic";
import { OutlineMicOff } from "../Icons/MicOff";
import { BaselineFullscreen } from "../Icons/FullScreen";

export default function Participant({ stream, audioEnabled }) {
    const joinerScreen = useRef(null);

    const handleFullScreen = () => {
        if (joinerScreen.current) {
            if (joinerScreen.current.requestFullscreen) {
                joinerScreen.current.requestFullscreen();
            } else if (joinerScreen.current.mozRequestFullScreen) { // Firefox
                joinerScreen.current.mozRequestFullScreen();
            } else if (joinerScreen.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
                joinerScreen.current.webkitRequestFullscreen();
            } else if (joinerScreen.current.msRequestFullscreen) { // IE/Edge
                joinerScreen.current.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        if (stream) {
            joinerScreen.current.srcObject = stream
        }
    }, [stream])

    return (
        <div style={{ position: "relative", height: "calc(100vh/1.9)", width: "700px" }}>
            <video
                ref={joinerScreen}
                style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    background: "black"
                }}
                autoPlay
                playsInline
            />
            <span
                style={{ position: "absolute", right: 10, top: 10 }}>
                <Button
                    icon={<BaselineFullscreen style={{ fontSize: "27px", color: "#dadada" }} />}
                    style={{ background: "rgba(221, 216, 216,0.7)", border: "none" }}
                    onClick={handleFullScreen} /></span>
            <span
                style={{ position: "absolute", right: 10, bottom: 10 }}>
                {audioEnabled ? <OutlineMicNone style={{ fontSize: "21px", color: "white" }} /> : <OutlineMicOff style={{ fontSize: "21px", color: "red" }} />}
            </span>
        </div>
    )
}