"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const INITIAL_TASKS = {
  todo: [
    { id: "t1", title: "Setup Project Repository", priority: "High" },
    { id: "t2", title: "Define Requirements", priority: "Medium" },
  ],
  inProgress: [
    { id: "t3", title: "Design Database Schema", priority: "High" },
  ],
  done: [
    { id: "t4", title: "Initial Meeting", priority: "Low" },
  ],
}

export default function KanbanPage() {
  const { id } = useParams()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 pb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Project Kanban</h2>
          <p className="text-muted-foreground">
            Task management for project {id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
            <h3 className="font-semibold">To Do</h3>
            <Badge variant="secondary">{INITIAL_TASKS.todo.length}</Badge>
          </div>
          <div className="space-y-3">
            {INITIAL_TASKS.todo.map(task => (
              <Card key={task.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-3">{task.title}</p>
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === 'High' ? 'text-red-500 border-red-200 bg-red-50' : 
                      task.priority === 'Medium' ? 'text-amber-500 border-amber-200 bg-amber-50' : 
                      'text-green-500 border-green-200 bg-green-50'
                    }
                  >
                    {task.priority}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
            <h3 className="font-semibold">In Progress</h3>
            <Badge variant="secondary">{INITIAL_TASKS.inProgress.length}</Badge>
          </div>
          <div className="space-y-3">
            {INITIAL_TASKS.inProgress.map(task => (
              <Card key={task.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-3">{task.title}</p>
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === 'High' ? 'text-red-500 border-red-200 bg-red-50' : 
                      task.priority === 'Medium' ? 'text-amber-500 border-amber-200 bg-amber-50' : 
                      'text-green-500 border-green-200 bg-green-50'
                    }
                  >
                    {task.priority}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Done Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
            <h3 className="font-semibold">Done</h3>
            <Badge variant="secondary">{INITIAL_TASKS.done.length}</Badge>
          </div>
          <div className="space-y-3">
            {INITIAL_TASKS.done.map(task => (
              <Card key={task.id} className="cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <p className="font-medium text-sm mb-3 line-through text-muted-foreground">{task.title}</p>
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === 'High' ? 'text-red-500 border-red-200 bg-red-50' : 
                      task.priority === 'Medium' ? 'text-amber-500 border-amber-200 bg-amber-50' : 
                      'text-green-500 border-green-200 bg-green-50'
                    }
                  >
                    {task.priority}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
