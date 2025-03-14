import { Button, Flex, Input, Layout, Form } from "antd";
import React from "react";
import BgImage from "./Image/Bg.jpg";
import Logo from "./Image/logo.png";

export default function MeetingPage() {
    return (
        <Layout
            style={{
                height: "100vh",
                overflow: "hidden",
                backgroundImage: `url(${BgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
            }}
        >
            <div style={{
                position: "absolute",
                left: "-12px",
                top: "-15px",
                backgroundImage: `url(${Logo})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "260px",
                height: "130px"
            }}></div>

            <Flex justify="space-between" align="center" style={{ height: "100vh" }}>
                <Flex justify="center" align="center" vertical gap={15} style={{ width: "100%" }}>
                    <Form layout="vertical" onFinish={(values) => console.log(values)}>
                        <Form.Item
                            name="joinName"
                            rules={[{ required: true, message: "Please enter your name!" }]}
                        >
                            <Input
                                style={{ width: "300px", height: "40px", border: "1px solid rgb(133 133 133)" }}
                                placeholder="Your Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="roomId"
                            rules={[{ required: true, message: "Please enter the Room ID!" }]}
                        >
                            <Input
                                style={{ width: "300px", height: "40px", border: "1px solid rgb(133 133 133)" }}
                                placeholder="Room Id"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">JOIN</Button>
                        </Form.Item>
                    </Form>
                </Flex>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid rgb(133, 133, 133)",
                        height: "72%"
                    }}
                ></div>

                <Flex justify="center" align="center" vertical gap={15} style={{ width: "100%" }}>
                    <Form layout="vertical" onFinish={(values) => console.log(values)}>
                        <Form.Item
                            name="hostName"
                            rules={[{ required: true, message: "Please enter your name!" }]}
                        >
                            <Input
                                style={{ width: "300px", height: "40px", border: "1px solid rgb(133 133 133)" }}
                                placeholder="Your Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="meetingTitle"
                            rules={[{ required: true, message: "Please enter the Meeting Title!" }]}
                        >
                            <Input
                                style={{ width: "300px", height: "40px", border: "1px solid rgb(133 133 133)" }}
                                placeholder="Meeting Title"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Start Meeting</Button>
                        </Form.Item>
                    </Form>
                </Flex>
            </Flex>
        </Layout>
    );
}
