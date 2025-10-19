"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Loader2 } from "lucide-react"

interface Analysis {
  detectedStyle: string
  dominantColors: string[]
  suggestedBodyType: string
  skinTone: string
  confidence: number
  recommendations: string[]
}

export default function ImageUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<Analysis | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/ai/image-analysis", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error("Failed to analyze image:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">AI Style Analysis</h1>
        <p className="text-lg text-muted-foreground mb-8">Upload a photo to get personalized style recommendations</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Photo</CardTitle>
              <CardDescription>Upload a clear photo of yourself or an outfit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition cursor-pointer">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-input" />
                <label htmlFor="file-input" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="font-medium text-foreground">Click to upload</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                </label>
              </div>

              {preview && (
                <div className="relative">
                  <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full rounded-lg" />
                </div>
              )}

              <Button onClick={handleAnalyze} disabled={!file || loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Style"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle>Your Style Profile</CardTitle>
                <CardDescription>AI-powered analysis results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Detected Style</p>
                  <p className="text-2xl font-bold text-foreground capitalize">{analysis.detectedStyle}</p>
                  <p className="text-sm text-muted-foreground">Confidence: {(analysis.confidence * 100).toFixed(0)}%</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Dominant Colors</p>
                  <div className="flex gap-2">
                    {analysis.dominantColors.map((color) => (
                      <div
                        key={color}
                        className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm capitalize"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Body Type</p>
                    <p className="font-semibold text-foreground capitalize">{analysis.suggestedBodyType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Skin Tone</p>
                    <p className="font-semibold text-foreground capitalize">{analysis.skinTone}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Recommendations</p>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-foreground flex gap-2">
                        <span className="text-accent">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">Get Personalized Recommendations</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
