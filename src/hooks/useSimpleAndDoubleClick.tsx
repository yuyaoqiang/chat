import React, { useState } from "react"
import { useEffect } from "react";
let matchType: number | undefined = undefined;
function useSimpleAndDoubleClick(actionSimpleClick: any, actionDoubleClick: any, delay = 250) {
    const [click, setClick] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            // simple click
            if (click === 1) actionSimpleClick(matchType);
            setClick(0);
        }, delay);

        // the duration between this click and the previous one
        // is less than the value of delay = double-click
        if (click === 2) actionDoubleClick(matchType);

        return () => clearTimeout(timer);
    }, [click]);

    return (type: any) => {
        matchType = type;
        setClick(prev => prev + 1)
    };
}
export default useSimpleAndDoubleClick;