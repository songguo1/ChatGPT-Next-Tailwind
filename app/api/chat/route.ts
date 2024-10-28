import { sleep } from "@/common/util";
import deepseek from "@/lib/deepseek";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { messages,model } = (await request.json()) as MessageRequestBody;


    // 检查 messages 是否存在且不为空
    if (!messages || messages.length === 0) {
        return new Response("No messages provided", { status: 400 });
        
    }

    // 使用 deepseek 生成回复
    const completion = await deepseek.chat.completions.create({
        messages: [...messages, { role: "system", content: "You are a helpful assistant." }],
        model: model,
    });

    // 检查 completion.choices 是否存在且不为空
    if (!completion.choices || completion.choices.length === 0) {
        return new Response("No response from AI", { status: 500 });
    }

    // 提取 AI 的回复
    const botReply = completion.choices[0].message.content;
    if (!botReply) {
        return new Response("AI did not return a reply", { status: 500 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            for (let i = 0; i < botReply.length; i++) {
                await sleep(10);
                controller.enqueue(encoder.encode(botReply[i]));
            }
            controller.close();
        }
    });

    return new Response(stream);
}
