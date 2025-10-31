'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '../../components/layout/Sidebar'
import { Header } from '../../components/layout/Header'
import { useAuth } from '../../hooks/useAuth'
import { PaymentRequestDetail } from '@/components/payment-requests/PaymentRequestDetail'
import { PaymentRequest } from '@/types'

export default function PaymentRequestsPage() {
    const router = useRouter()
    const { isAuthenticated, loading: authLoading } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, authLoading, router])

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) return null

    const handleNavigate = (path: string) => router.push(path)

    // Temporary placeholder data until API integration is wired
    const mockPaymentRequest: PaymentRequest = {
        id: 'pr_demo_0001',
        created_at: new Date().toISOString(),
        vendor_name: 'Acme Corp',
        amount: 0,
        program: 'General',
        due_date: new Date().toISOString(),
        requester_email: 'demo@example.com',
        status: 'staging',
        notes: null,
        asana_task_id: '1211782013164396',
        qbo_invoice_id: null,
        drive_folder_id: null,
        container_id: null,
    } as unknown as PaymentRequest
    const quickActions = (status: string) => {
        console.log('Quick action:', status)
    }

    return (
        <div className="min-h-screen bg-secondary-50 flex">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                currentPath="/payment-requests"
                onNavigate={handleNavigate}
            />
            <div>
                <Header
                    onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
                    title="Payment Requests"
                />
                <main className="p-6">
                    {/* TODO: List, create button, etc. */}
                    <PaymentRequestDetail paymentRequest={mockPaymentRequest} onStatusChange={(status) => quickActions(status)} />
                </main>
            </div>
        </div>
    )
}