"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"
import type { Job } from "@/contexts/job-context"
import { useJobs } from "@/contexts/job-context"
import { CheckCircle2, AlertCircle } from "lucide-react"

interface ApplyModalProps {
  job: Job
  open: boolean
  onClose: () => void
}

export function ApplyModal({ job, open, onClose }: ApplyModalProps) {
  const { applyToJob } = useJobs()

  const handleClose = () => {
    applyToJob(job)
    onClose()
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent Match!"
    if (score >= 60) return "Good Match"
    return "Needs Improvement"
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Application Submitted!</DialogTitle>
          <DialogDescription className="text-center">Here's your ATS compatibility score</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* ATS Score */}
          <div className="text-center space-y-3">
            <div className={`text-5xl font-bold ${getScoreColor(job.atsScore)}`}>{job.atsScore}%</div>
            <p className="text-sm font-medium text-muted-foreground">{getScoreLabel(job.atsScore)}</p>
            <Progress value={job.atsScore} className="h-3" />
          </div>

          {/* Missing Keywords */}
          {job.missingKeywords.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Keywords to Improve Your Profile
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                    Adding these skills to your resume could improve your match score:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.missingKeywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="outline"
                        className="bg-white dark:bg-amber-900/50 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100"
                      >
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-accent/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Your application has been submitted to{" "}
              <span className="font-semibold text-foreground">{job.company}</span>. They will review your profile and
              get back to you soon.
            </p>
          </div>

          {/* Action Button */}
          <Button onClick={handleClose} className="w-full" size="lg">
            Continue Exploring Jobs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
