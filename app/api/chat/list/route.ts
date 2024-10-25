import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const param = request.nextUrl.searchParams.get("page");
        const page = param ? parseInt(param, 10) : 1;

        if (isNaN(page) || page < 1) {
            return NextResponse.json({ code: 1, message: "无效的页码" }, { status: 400 });
        }

        const list = await prisma.chat.findMany({
            skip: (page - 1) * 20,
            take: 20,
            orderBy: {
                updateTime: "desc"
            }
        });

        return NextResponse.json({ code: 0, data: { list } });
    } catch (error) {
        console.error("获取聊天列表失败:", error);
        return NextResponse.json({ code: 1, message: "服务器错误" }, { status: 500 });
    }
}
