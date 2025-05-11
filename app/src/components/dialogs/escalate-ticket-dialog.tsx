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
import { managers } from "../../../data/managers"

interface EscalateTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEscalate: (managerId: string, note: string) => void
}

export function EscalateTicketDialog({ open, onOpenChange, onEscalate }: EscalateTicketDialogProps) {
  const [selectedManager, setSelectedManager] = useState("")
  const [escalationNote, setEscalationNote] = useState("")

  const handleEscalate = () => {
    if (selectedManager) {
      onEscalate(selectedManager, escalationNote)
      setSelectedManager("")
      setEscalationNote("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Escalate Ticket</DialogTitle>
          <DialogDescription>
            Select a manager to escalate this ticket to and provide a reason for escalation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <Label>Select Manager</Label>
            <RadioGroup value={selectedManager} onValueChange={setSelectedManager}>
              {managers.map((manager) => (
                <div key={manager.id} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={manager.id} id={manager.id} />
                  <Label htmlFor={manager.id} className="flex items-center gap-2 cursor-pointer flex-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={manager.avatar || "/placeholder.svg"} alt={manager.name} />
                      <AvatarFallback>{manager.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{manager.name}</p>
                      <p className="text-xs text-gray-500">{manager.role}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="escalation-note">Reason for Escalation</Label>
            <Textarea
              id="escalation-note"
              placeholder="Explain why this ticket needs to be escalated..."
              value={escalationNote}
              onChange={(e) => setEscalationNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleEscalate} disabled={!selectedManager}>
            Escalate Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
