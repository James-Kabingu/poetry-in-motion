"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Mail, Phone, Clock } from "lucide-react"

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("faq")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketDescription, setTicketDescription] = useState("")

  const handleSubmitTicket = async () => {
    if (!ticketSubject || !ticketDescription) {
      alert("Please fill in all fields")
      return
    }

    try {
      await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user123",
          subject: ticketSubject,
          description: ticketDescription,
          category: "general",
        }),
      })
      alert("Ticket submitted successfully!")
      setTicketSubject("")
      setTicketDescription("")
    } catch (error) {
      console.error("Failed to submit ticket:", error)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 text-center bg-card/50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">How Can We Help?</h1>
          <p className="text-lg text-muted-foreground">
            We're here to support you 24/7. Choose how you'd like to reach us.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Average response time: 2 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Chat with our support team in real-time</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Mail className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Average response time: 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">support@styleai.com</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Phone className="h-8 w-8 text-accent mb-2" />
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>Available 9 AM - 6 PM EAT</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">+254 (0) 123 456 789</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Call Us
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "faq"
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => setActiveTab("ticket")}
              className={`px-4 py-2 font-medium transition ${
                activeTab === "ticket"
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Submit Ticket
            </button>
          </div>

          {/* FAQ Tab */}
          {activeTab === "faq" && (
            <div className="space-y-4">
              {[
                {
                  q: "How long does shipping take?",
                  a: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.",
                },
                {
                  q: "What's your return policy?",
                  a: "We offer free returns within 30 days of purchase. Items must be unworn and in original condition.",
                },
                {
                  q: "How does the AI recommendation work?",
                  a: "Our AI analyzes your style preferences, body type, and skin tone to recommend pieces that match your unique style.",
                },
                {
                  q: "Can I cancel my subscription?",
                  a: "Yes! You can cancel anytime. Your access continues until the end of your billing period.",
                },
                {
                  q: "Is my payment information secure?",
                  a: "Absolutely. We use PCI DSS Level 1 compliance and SSL encryption for all transactions.",
                },
                {
                  q: "How do I track my order?",
                  a: "You'll receive a tracking number via email once your order ships. You can track it in your dashboard.",
                },
              ].map((faq, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Ticket Tab */}
          {activeTab === "ticket" && (
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
                <CardDescription>Tell us what's wrong and we'll get back to you ASAP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
                  <textarea
                    placeholder="Provide detailed information about your issue"
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={6}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Average response time: 24 hours
                </div>

                <Button onClick={handleSubmitTicket} className="w-full">
                  Submit Ticket
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  )
}
