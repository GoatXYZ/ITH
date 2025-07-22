"use client";
import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";

export default function ContactTest() {
  const [status, setStatus] = useState<"idle"|"loading"|"sent"|"error">("idle");
  const [response, setResponse] = useState<string>("");

  async function sendTestEmail() {
    setStatus("loading");
    setResponse("");
    
    const testData = {
      ticketId: `K-${Date.now().toString().slice(-5)}`,
      name: "Test User",
      email: "test@example.com",
      department: "IT",
      priority: "medium",
      category: "technical-issue",
      subject: "Test Support Ticket",
      description: "This is a test support ticket to verify email functionality is working correctly."
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(testData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus("sent");
        setResponse(`✅ Test email sent successfully!\nTicket ID: ${testData.ticketId}`);
      } else {
        setStatus("error");
        setResponse(`❌ Error: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setStatus("error");
      setResponse(`❌ Network error: ${error}`);
    }
  }

  return (
    <>
      <Head>
        <title>Contact Form Test - Email Testing</title>
        <meta name="description" content="Test the contact form email functionality" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Email Test</h2>
              <p className="text-slate-600">Test the contact form email functionality with sample data</p>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-700 mb-2">Test Data Preview:</h3>
                <div className="text-sm text-slate-600 space-y-1">
                  <p><strong>Name:</strong> Test User</p>
                  <p><strong>Email:</strong> test@example.com</p>
                  <p><strong>Department:</strong> IT</p>
                  <p><strong>Priority:</strong> Medium</p>
                  <p><strong>Category:</strong> Technical Issue</p>
                  <p><strong>Subject:</strong> Test Support Ticket</p>
                  <p><strong>Description:</strong> This is a test support ticket to verify email functionality...</p>
                </div>
              </div>

              <Button 
                onClick={sendTestEmail}
                disabled={status === "loading"}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Test Email...
                  </span>
                ) : "Send Test Email"}
              </Button>

              {response && (
                <div className={`p-4 rounded-lg border ${
                  status === "sent" 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}>
                  <pre className={`text-sm font-mono whitespace-pre-wrap ${
                    status === "sent" ? "text-green-800" : "text-red-800"
                  }`}>
                    {response}
                  </pre>
                </div>
              )}

              <div className="text-center">
                <a 
                  href="/contact" 
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  ← Back to Contact Form
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}