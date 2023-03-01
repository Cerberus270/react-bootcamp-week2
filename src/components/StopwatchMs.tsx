import React, { useRef, useState, useEffect } from 'react'

type StopwatchType = {
    start: boolean
    stop: boolean
    // reset: boolean
}

type Time = {
    ms: number
    s: number
    m: number
}
const StopwatchMs = ({ start, stop }: StopwatchType) => {
    const [tiempo, setTiempo] = useState<Time>({ ms: 0, s: 0, m: 0 });
    const ref = useRef<number>();

    function hola(): void {
        if (start) {
            ref.current = setInterval(() => setTiempo((t) => {
                let ms = t.ms + 1;
                let s = t.s;
                let m = t.m;
                if (ms == 100) {
                    ms = 1;
                    s = t.s + 1;
                }
                if (s == 60) {
                    s = 0;
                    m = t.m + 1
                }
                return { ms, s, m }
            }), 10);
        } else if (stop) {
            console.log("Hola");
            ref.current && clearInterval(ref.current);
        }
    }

    useEffect(() => {
        hola();
    }, [start, stop])

    // if(iniciar){
    //     ref.current && clearInterval(ref.current);
    //     ref.current = setInterval(() => setSegundos(s => s + 1), 1000);
    // }



    return (
        <>
            <h4>Timer:  <small>{tiempo.m}</small>: <small>{tiempo.s}</small>. <small>{tiempo.ms}</small></h4>
        </>
    )
}

export default StopwatchMs