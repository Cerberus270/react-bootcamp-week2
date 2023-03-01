import React, { useRef, useState, useEffect } from 'react'
import { Time } from '../TimeType'

type StopwatchType = {
    start: boolean
    stop: boolean
    alarma: Time
    reset: boolean
}


const Stopwatch = ({ start, stop, alarma, reset }: StopwatchType) => {
    const [tiempo, setTiempo] = useState<Time>({ s: 0, m: 0, h: 0 });
    const [vueltas, setVuelta] = useState<Time[]>([]);
    const ref = useRef<number>();

    function inicio(): void {
        if (start && stop === false) {
            ref.current = setInterval(() => setTiempo((t) => {
                let s = t.s + 1;
                let m = t.m;
                let h = t.h
                if (s == 60) {
                    s = 0;
                    m = t.m + 1
                }
                if (m == 60) {
                    m = 0;
                    h = t.h + 1;
                }
                return { s, m, h }
            }), 1000);
        } else if (stop && start === false) {
            ref.current && clearInterval(ref.current);
        } else if (stop === false && start === false && reset === true) {
            ref.current && clearInterval(ref.current);
            setTiempo({ s: 0, m: 0, h: 0 });
        }
    }

    useEffect(() => {
        inicio();
    }, [start, stop]);


    useEffect(() => {
        if (((tiempo.m === alarma.m) && (tiempo.s === alarma.s) && (tiempo.h === alarma.h))) {
            alert("Tu Alerta se ha disparado!");
        }
    }, [tiempo]);

    const handleSubmitVuelta = () => {
        vueltas.push(tiempo);
    }


    return (
        <>
            <div>

                <div className='my-20 mx-auto text-center rounded-full'>

                    <div className="font-bold text-gray-800 rounded-full bg-slate-400 flex items-center justify-center font-mono stopwatch mx-auto text-center">

                        <h4 className='text-3xl'><small>{tiempo.h}</small>: <small>{tiempo.m}</small>: <small>{tiempo.s}</small></h4>
                    </div>
                </div>


                <div className='mx-auto text-center w-2/12'>
                    <button className='bg-slate-700 px-10 py-1 rounded-2xl text-white shadow-lg hover:bg-slate-500' onClick={() => handleSubmitVuelta()}>Guardar Vuelta</button>
                    <ul className='text-center mt-5 list-disc text-white font-mono'>

                        {
                            vueltas.map(vuelta =>
                            (
                                <li key={vuelta.h + vuelta.m + vuelta.s}>{vuelta.h}: {vuelta.m}: {vuelta.s}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Stopwatch