'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Arena() {
  const [estadoJogo, setEstadoJogo] = useState(null)

  useEffect(() => {
const fetchEstado = async () => {
      const { data, error } = await supabase.from('estado_do_jogo').select('*').eq('id', 1).single()
      
      if (error) {
        console.error("🚨 ERRO NO SUPABASE:", error.message, error.details, error.hint)
      } else {
        console.log("✅ DADOS RECEBIDOS:", data)
        setEstadoJogo(data)
      }
    }
    fetchEstado()

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'estado_do_jogo' }, 
        (payload) => setEstadoJogo(payload.new)
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  if (!estadoJogo) return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando o Arraiá...</div>

  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      {estadoJogo.status_rodada === 'aguardando' && (
        <h1 style={{ color: '#9a3412' }}>Aguardando o Xerife iniciar...</h1>
      )}

      {estadoJogo.status_rodada === 'em_andamento' && (
        <div>
          <h2 style={{ color: '#dc2626' }}>Rodada {estadoJogo.rodada_atual}</h2>
          <p>Olhe para o telão/TV para ler a pergunta!</p>
          {/* Botões simplificados para o MVP */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            {['A', 'B', 'C', 'D'].map((letra) => (
              <button key={letra} style={{ padding: '15px', fontSize: '18px', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '8px' }}>
                Alternativa {letra}
              </button>
            ))}
          </div>
        </div>
      )}

      {estadoJogo.status_rodada === 'tempo_esgotado' && (
        <h1 style={{ color: '#b91c1c' }}>⏳ Tempo esgotado! Olhe para o Xerife!</h1>
      )}

      {estadoJogo.status_rodada === 'revelado' && (
        <div>
          <h1 style={{ color: '#15803d' }}>A Resposta foi revelada!</h1>
          <p>Sobreviveu ou foi pro xilindró?</p>
        </div>
      )}

    </div>
  )
}
