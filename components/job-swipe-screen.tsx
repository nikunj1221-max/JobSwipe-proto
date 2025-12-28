"use client"

import { useState } from "react"
import { JobCard } from "./job-card"
import { JobDetailModal } from "./job-detail-modal"
import { ApplyModal } from "./apply-modal"
import { useJobs, type Job } from "@/contexts/job-context"
import { Button } from "./ui/button"
import { Briefcase, X, Heart } from "lucide-react"

export function JobSwipeScreen() {
  const { currentJob, interestedJobs, appliedJobs, handleSwipe } = useJobs()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleCardClick = (job: Job) => {
    setSelectedJob(job)
    setShowDetailModal(true)
  }

  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setShowDetailModal(false)
    setShowApplyModal(true)
  }

  if (!currentJob) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-accent p-6 shadow-lg">
              <Briefcase className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold">No More Jobs!</h2>
          <p className="text-muted-foreground max-w-md">
            You've reviewed all available positions. Check back later for new opportunities!
          </p>
          <div className="pt-4 space-y-2">
            <p className="text-sm font-medium">Your Stats:</p>
            <div className="flex gap-4 justify-center">
              <div className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 rounded-lg px-4 py-2 shadow-md">
                <p className="text-2xl font-bold text-gradient">{interestedJobs.length}</p>
                <p className="text-xs text-muted-foreground">Interested</p>
              </div>
              <div className="bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary/20 rounded-lg px-4 py-2 shadow-md">
                <p className="text-2xl font-bold text-gradient">{appliedJobs.length}</p>
                <p className="text-xs text-muted-foreground">Applied</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 border-b bg-gradient-to-r from-card via-card to-primary/5 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">JobSwipe</h1>
            </div>
            <div className="flex gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-primary" />
                <span className="font-medium">{interestedJobs.length}</span>
              </div>
              <div className="text-muted-foreground">
                Applied: <span className="font-medium text-foreground">{appliedJobs.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4 pb-24">
          <JobCard job={currentJob} onCardClick={handleCardClick} onSwipe={handleSwipe} />
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
          <div className="max-w-md mx-auto flex justify-center gap-6">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16 border-2 hover:border-destructive hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-100 bg-card shadow-lg transition-all"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-6 w-6 text-destructive" />
            </Button>
            <Button
              size="lg"
              className="rounded-full h-16 w-16 bg-gradient-accent hover:opacity-90 shadow-lg transition-all"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedJob && (
        <>
          <JobDetailModal
            job={selectedJob}
            open={showDetailModal}
            onClose={() => setShowDetailModal(false)}
            onApply={() => handleApply(selectedJob)}
          />
          <ApplyModal job={selectedJob} open={showApplyModal} onClose={() => setShowApplyModal(false)} />
        </>
      )}
    </>
  )
}
