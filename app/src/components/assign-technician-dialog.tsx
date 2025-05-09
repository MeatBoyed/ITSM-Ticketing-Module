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
import { Badge } from "@/components/ui/badge"
import { technicians } from "../../data/technicians"
import type { Technician } from "../../types/ticket"

interface AssignTechnicianDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssign: (technicianId: string, note: string) => void
  currentTechnician?: Technician
}

export function AssignTechnicianDialog({
  open,
  onOpenChange,
  onAssign,
  currentTechnician,
}: AssignTechnicianDialogProps) {
  const [selectedTechnician, setSelectedTechnician] = useState("")
  const [assignmentNote, setAssignmentNote] = useState("")

  // Filter out the current technician from the list if one is assigned
  const availableTechnicians = currentTechnician
    ? technicians.filter((tech) => tech.id !== currentTechnician.id)
    : technicians

  const handleAssign = () => {
    if (selectedTechnician) {
      onAssign(selectedTechnician, assignmentNote)
      setSelectedTechnician("")
      setAssignmentNote("")
    }
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "Available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
      case "Busy":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Busy</Badge>
      case "On Leave":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">On Leave</Badge>
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{currentTechnician ? "Reassign Technician" : "Assign Technician"}</DialogTitle>
          <DialogDescription>
            {currentTechnician
              ? "Select a new technician to reassign this ticket to."
              : "Assign a technician to implement the solution for this ticket."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {currentTechnician && (
            <div className="space-y-4">
              <Label>Current Technician</Label>
              <div className="flex items-center space-x-3 border rounded-md p-3 bg-gray-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentTechnician.avatar || "/placeholder.svg"} alt={currentTechnician.name} />
                  <AvatarFallback>{currentTechnician.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{currentTechnician.name}</p>
                  <p className="text-xs text-gray-500">{currentTechnician.specialization}</p>
                </div>
                {getAvailabilityBadge(currentTechnician.availability)}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label>Select {currentTechnician ? "New " : ""}Technician</Label>
            <RadioGroup value={selectedTechnician} onValueChange={setSelectedTechnician}>
              {availableTechnicians.map((technician) => (
                <div key={technician.id} className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value={technician.id} id={technician.id} />
                  <Label htmlFor={technician.id} className="flex items-center gap-2 cursor-pointer flex-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={technician.avatar || "/placeholder.svg"} alt={technician.name} />
                      <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{technician.name}</p>
                      <p className="text-xs text-gray-500">{technician.specialization}</p>
                    </div>
                    {getAvailabilityBadge(technician.availability)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignment-note">Assignment Note</Label>
            <Textarea
              id="assignment-note"
              placeholder="Add details about what the technician needs to do..."
              value={assignmentNote}
              onChange={(e) => setAssignmentNote(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={!selectedTechnician}>
            {currentTechnician ? "Reassign" : "Assign"} Technician
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
