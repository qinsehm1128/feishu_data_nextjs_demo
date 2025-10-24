"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

// 声明飞书 bitable API
declare const bitable: {
  getConfig: () => Promise<string>;
  getUserId: () => Promise<string>;
  getTenantKey: () => Promise<string>;
  saveConfigAndGoNext: (config: string) => Promise<void>;
};

export default function Home() {
  const [value, setValue] = useState("");
  const [userId, setUserId] = useState("");
  const [tenantKey, setTenantKey] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    // 检查是否在飞书环境中
    if (typeof window !== "undefined" && typeof bitable !== "undefined") {
      // 获取配置和用户信息
      Promise.all([
        bitable.getConfig(),
        bitable.getUserId(),
        bitable.getTenantKey(),
      ])
        .then(([config, uid, tenant]) => {
          console.log("test, pre sync config", config);
          console.log("userId", uid);
          console.log("tenantKey", tenant);
          setValue(config);
          setUserId(uid);
          setTenantKey(tenant);
          form.setFieldsValue({ config1: config, config2: "" });
        })
        .catch((error) => {
          console.error("Failed to load config:", error);
        });
    }
  }, [form]);

  const handleSaveConfig = async () => {
    try {
      const values = await form.validateFields();
      const config = JSON.stringify(values);

      if (typeof bitable !== "undefined") {
        await bitable.saveConfigAndGoNext(config);
      } else {
        console.log("Config saved:", config);
        alert("配置已保存（开发模式）");
      }
    } catch (error) {
      console.error("Failed to save config:", error);
    }
  };

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Form form={form} layout="vertical">
        <Form.Item
          label="配置项-1"
          name="config1"
          rules={[{ required: true, message: "请输入配置项-1" }]}
        >
          <Input placeholder="请输入配置项-1" />
        </Form.Item>

        <Form.Item
          label="配置项-2"
          name="config2"
          rules={[{ required: true, message: "请输入配置项-2" }]}
        >
          <Input placeholder="请输入配置项-2" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSaveConfig}>
            下一步
          </Button>
        </Form.Item>
      </Form>

      {/* 调试信息 */}
      {(userId || tenantKey) && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f0f0f0" }}>
          <p><strong>用户ID:</strong> {userId}</p>
          <p><strong>租户Key:</strong> {tenantKey}</p>
        </div>
      )}
    </div>
  );
}
