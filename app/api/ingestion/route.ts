import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {
  const start = Date.now()

  try {
    const res = await fetch("https://external-source.com/events.json")
    const data = await res.json()

    for (const event of data.events) {
      await prisma.event.upsert({
        where: { slug: event.slug },
        update: {
          title: event.title,
          artist: event.artist,
        },
        create: {
          title: event.title,
          slug: event.slug,
          artist: event.artist,
          date: new Date(event.date),
          location: event.location,
          description: event.description
        }
      })
    }

    await prisma.ingestionLog.create({
      data: {
        fileName: "events.json",
        status: "SUCCESS",
        duration: (Date.now() - start) / 1000
      }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    await prisma.ingestionLog.create({
      data: {
        fileName: "events.json",
        status: "FAILED",
        error: error.message
      }
    })

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
