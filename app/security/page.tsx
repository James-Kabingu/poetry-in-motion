import { Shield, Lock, Eye, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">Security & Trust</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your security and privacy are our top priorities. Learn how we protect your data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Data Encryption</CardTitle>
              <CardDescription>Industry-leading security standards</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              All data transmitted between your device and our servers is encrypted using SSL/TLS 1.2 or higher. We use
              AES-256 encryption for sensitive data at rest.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-8 w-8 text-accent mb-2" />
              <CardTitle>PCI DSS Compliance</CardTitle>
              <CardDescription>Payment card industry standards</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We are PCI DSS Level 1 compliant. Payment information is never stored on our servers and is processed
              through secure, certified payment gateways.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Eye className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Regular Audits</CardTitle>
              <CardDescription>Third-party security assessments</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              We conduct quarterly penetration testing and annual security audits by independent third-party firms to
              identify and address vulnerabilities.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <AlertCircle className="h-8 w-8 text-accent mb-2" />
              <CardTitle>Incident Response</CardTitle>
              <CardDescription>24/7 monitoring and response</CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              Our security team monitors for threats 24/7. In the unlikely event of a breach, we have a documented
              incident response plan and will notify affected users within 24 hours.
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">For Your Account</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Use a strong, unique password</li>
                  <li>Enable two-factor authentication</li>
                  <li>Never share your login credentials</li>
                  <li>Log out when using shared devices</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">For Your Device</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Keep your operating system updated</li>
                  <li>Use antivirus software</li>
                  <li>Use a secure internet connection</li>
                  <li>Be cautious of phishing emails</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report a Security Issue</CardTitle>
            <CardDescription>Found a vulnerability? Let us know responsibly</CardDescription>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            If you discover a security vulnerability, please email security@styleai.com with details. Do not publicly
            disclose the vulnerability until we have had time to address it. We appreciate responsible disclosure and
            will acknowledge your report within 24 hours.
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
