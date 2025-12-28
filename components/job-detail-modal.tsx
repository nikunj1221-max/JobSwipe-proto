"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Job } from "@/contexts/job-context"
import { Building2, GraduationCap, Users, ScrollText, CheckCircle2, Sparkles } from "lucide-react"

interface JobDetailModalProps {
  job: Job
  open: boolean
  onClose: () => void
  onApply: () => void
}

export function JobDetailModal({ job, open, onClose, onApply }: JobDetailModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-balance">{job.title}</DialogTitle>
              <DialogDescription className="text-base">{job.company}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded">
                <ScrollText className="h-4 w-4 text-primary" />
              </div>
              Technologies & Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-3 py-1.5 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h3 className="text-sm font-semibold mb-2">Job Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-xl p-5 border border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-primary/10 rounded">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-sm font-semibold">Eligibility Criteria</h3>
            </div>

            <div className="space-y-3">
              <div className="bg-card rounded-lg p-3 border border-primary/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">Minimum CGPA Required</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{job.eligibility.minCGPA}</span>
                      <span className="text-xs text-muted-foreground">/ 10.0</span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              </div>

              <div className="bg-card rounded-lg p-3 border border-primary/5">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/15 to-primary/5 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2">Eligible Branches</p>
                    <div className="flex flex-wrap gap-2">
                      {job.eligibility.branches.map((branch) => (
                        <Badge
                          key={branch}
                          variant="outline"
                          className="text-xs px-2.5 py-1 bg-gradient-to-br from-primary/5 to-transparent border-primary/20"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1.5 text-primary" />
                          {branch}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={onApply}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            size="lg"
          >
            Apply Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
