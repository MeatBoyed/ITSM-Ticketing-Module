"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { agents } from "../../../data/agents"
import type { Agent } from "../../types/ticket"

interface ReassignTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onReassign: (agentId: string, note: string) => void
  currentAgent: Agent
}

export function ReassignTicketDialog({ open, onOpenChange, onReassign, currentAgent }: ReassignTicketDialogProps) {
  const [selectedAgent, setSelectedAgent] = useState("")
  const [reassignNote, setReassignNote] = useState("")

  // Filter out the current agent from the list
  const availableAgents = agents.filter((agent) => agent.id !== currentAgent.id)

  const handleReassign = () => {
    if (selectedAgent) {
      onReassign(selectedAgent, reassignNote)
      setSelectedAgent("")
      setReassignNote("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reassign Ticket</DialogTitle>
          <DialogDescription>
            Select an agent to reassign this ticket to and provide a reason for reassignment.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Current Agent</Label>
            <div className="flex items-center space-x-3 border rounded-md p-3 bg-gray-50">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentAgent.avatar || "/placeholder.svg"} alt={currentAgent.name} />
                <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{currentAgent.name}</p>
                <p className="text-xs text-gray-500">{currentAgent.role}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Select New Agent</Label>
            <RadioGroup value={selectedAgent} onValueChange={setSelectedAgent}>
              {availableAgents.map((agent) => (
                <div key={agent.id} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={agent.id} id={agent.id} />
                  <Label htmlFor={agent.id} className="flex items-center gap-2 cursor-pointer flex-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar || "/placeholder.svg"} alt={agent.name} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.role}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reassign-note">Reason for Reassignment</Label>
            <Textarea
              id="reassign-note"
              placeholder="Explain why this ticket needs to be reassigned..."
              value={reassignNote}
              onChange={(e) => setReassignNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleReassign} disabled={!selectedAgent}>
            Reassign Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
