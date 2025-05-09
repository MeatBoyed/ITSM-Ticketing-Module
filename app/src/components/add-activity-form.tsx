"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { SendHorizontal } from "lucide-react"

interface AddActivityFormProps {
  onAddActivity: (type: string, note: string) => void
  userRole: "Agent" | "Technician"
}

export function AddActivityForm({ onAddActivity, userRole }: AddActivityFormProps) {
  const [activityType, setActivityType] = useState(userRole === "Agent" ? "comment" : "work_log")
  const [activityNote, setActivityNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activityNote.trim()) {
      onAddActivity(activityType, activityNote)
      setActivityNote("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 rounded-lg p-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="activity-type">Activity Type</Label>
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comment">Comment</SelectItem>
              {userRole === "Technician" && <SelectItem value="work_log">Work Log</SelectItem>}
            </SelectContent>
          </Select>
        </div>
        <Textarea
          id="activity-note"
          placeholder={
            activityType === "comment"
              ? "Add a comment about this ticket..."
              : "Document the work performed on this ticket..."
          }
          value={activityNote}
          onChange={(e) => setActivityNote(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!activityNote.trim()} className="flex items-center gap-2">
          <SendHorizontal size={16} />
          <span>Add {activityType === "comment" ? "Comment" : "Work Log"}</span>
        </Button>
      </div>
    </form>
  )
}
