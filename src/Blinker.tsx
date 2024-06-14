import React, { useEffect, useRef, useState } from "react"


const Blinker = ({ periodTime = 500, char = "▌"}) => {

    const [showCursor, setShowCursor] = useState<boolean>(true)
    const cursorRef = useRef({ lastCursor: true })

    useEffect(() => {

        let handle = setInterval(() => {
            toggleCursor()
        }, periodTime)

        return () => clearTimeout(handle)
    }, [])

    const toggleCursor = () => {
        setShowCursor(!cursorRef.current.lastCursor)
        cursorRef.current.lastCursor = !cursorRef?.current?.lastCursor
    }

    return <>{showCursor ? char : ""}</>
}

export default Blinker