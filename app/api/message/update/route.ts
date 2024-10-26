import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { message:{id,...data}, title} = body
    if (!data.chatId) {
        const chat = await prisma.chat.create({
            data: {
                title:title
            }
        })
        data.chatId = chat.id
    }
    else{
        await prisma.chat.update({
            data:{
                updateTime: new Date()
            },
            where: {
                id: data.chatId
            }
        })
    }
    const message = await prisma.message.upsert({
        create: data,
        update: data,
        where: {
            id
        }
    })
    return NextResponse.json({ code: 0, data: { message } })
}