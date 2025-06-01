// components/ProtectedRoute.tsx
import {useSession} from 'next-auth/react'
import {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'

// Create a client-side only component with no SSR
const ProtectedRouteContent = ({children}: { children: React.ReactNode }) => {
    const {data: session, status} = useSession()
    const [, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (status !== 'loading' && !session) {
            setIsRedirecting(true)
            window.location.href = '/' // Use direct navigation instead of router
        }
    }, [session, status])

    return session ? <>{children}</> : null
}

// Create a dynamic component with ssr disabled
const ProtectedRoute = dynamic(() => Promise.resolve(ProtectedRouteContent), {
    ssr: false
})

export default ProtectedRoute