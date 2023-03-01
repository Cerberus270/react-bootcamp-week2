import { useState } from 'react'
import Stopwatch from './components/Stopwatch'
import { Time } from './TimeType';

function App() {
  const [inicio, setInicio] = useState<boolean>(false);
  const [pausar, setPausar] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [alarma, setAlarma] = useState<Time>({ m: -1, s: -1, h: -1 })

  const handleSubmitIniciar = (e: any) => {
    e.preventDefault();
    setInicio(!inicio);
    if (inicio) {
      setPausar(true);
    } else {
      setPausar(false);
    }
  }

  const handleSubmitAlarma = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    setAlarma({ m: parseInt(formJson.m as string), s: parseInt(formJson.s as string), h: parseInt(formJson.h as string) })
  }

  const handleSubmitReset = (e: any) => {
    e.preventDefault();
    setInicio(false);
    setPausar(false);
    setReset(true);
  }


  return (
    <>
      <div className="container mx-auto mt-2">
        <div className='flex flex-col mx-auto'>
          <h1 className='text-center text-3xl text-white'>Cronometro React Week 2</h1>
          <form className='mx-auto text-center' id='formIniciar' onSubmit={handleSubmitIniciar}>
            <button className='mt-5 bg-slate-700 px-10 py-1 rounded-2xl text-white shadow-lg hover:bg-slate-500'>{!inicio ? "▶" : "⏸"}</button>
          </form>

          <form id='formReset' className='mx-auto text-center' onSubmit={handleSubmitReset}>
            <button className='mt-5 bg-slate-700 px-10 py-1 rounded-2xl text-white shadow-lg'>⏹</button>
          </form>

          <form id='formAlarma' className='mt-5' onSubmit={handleSubmitAlarma}>
            <div className='mx-auto text-center text-white'>
              <input className='mx-1 px-1 border-b-2 border-gray-400 outline-none focus:border-gray-400 bg-zinc-600' type="number" required min={0} step={1} name="h" id="" placeholder='Horas' />
              <input className='mx-1 px-1 border-b-2 border-gray-400 outline-none focus:border-gray-400 bg-zinc-600' type="number" required min={0} max={60} step={1} name="m" id="" placeholder='Minutos' />
              <input className='mx-1 px-1 border-b-2 border-gray-400 outline-none focus:border-gray-400 bg-zinc-600' type="number" required min={0} max={60} step={1} name="s" id="" placeholder='Segundos' />
            </div>
            <div className='mx-auto text-center mt-5'>
              <button className='mt-5 bg-slate-700 px-10 py-1 rounded-2xl text-white shadow-lg hover:bg-slate-500' type='submit'>Enviar Alarma ⏰</button>
            </div>
          </form>

          <br />


          <Stopwatch start={inicio} stop={pausar} alarma={alarma} reset={reset} />
        </div>

      </div>


    </>
  )
}

export default App
