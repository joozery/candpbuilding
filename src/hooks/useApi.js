/**
 * useApi — Generic hook for API calls with loading/error state
 */
import { useState, useEffect, useCallback } from 'react'

export function useApi(apiFn, deps = []) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetch = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await apiFn()
            setData(result)
        } catch (err) {
            setError(err.message || 'เกิดข้อผิดพลาด')
        } finally {
            setLoading(false)
        }
    }, deps) // eslint-disable-line

    useEffect(() => { fetch() }, [fetch])

    return { data, loading, error, refetch: fetch }
}
