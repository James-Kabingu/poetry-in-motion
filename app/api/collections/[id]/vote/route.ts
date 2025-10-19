import { type NextRequest, NextResponse } from "next/server"
import { mockCollections } from "@/lib/mock-data"

// In-memory storage for votes
const collectionVotes: Record<string, Record<string, string>> = {}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = request.headers.get("x-user-id")
    const { voteType } = await request.json()

    if (!userId || !voteType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const collection = mockCollections[params.id]

    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 })
    }

    if (!collectionVotes[params.id]) {
      collectionVotes[params.id] = {}
    }

    const previousVote = collectionVotes[params.id][userId]

    // Remove previous vote if exists
    if (previousVote === "upvote") {
      collection.votes -= 1
    } else if (previousVote === "downvote") {
      collection.votes += 1
    }

    // Add new vote
    if (voteType === "upvote") {
      collection.votes += 1
    } else if (voteType === "downvote") {
      collection.votes -= 1
    }

    collectionVotes[params.id][userId] = voteType

    return NextResponse.json({
      success: true,
      data: {
        collectionId: params.id,
        votes: collection.votes,
        userVote: voteType,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to vote on collection" }, { status: 500 })
  }
}
