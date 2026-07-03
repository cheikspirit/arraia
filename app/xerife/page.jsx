'use client'
import { supabase } from '../../lib/supabase'

export default function PainelDoXerife() {
  
  const atualizarStatus = async (novoStatus) => {
    await supabase.from('estado_do_jogo').update({ status_rodada: novoStatus }).eq('id', 1)
  }

  const proximaRodada = async () => {
    const { data } = await supabase.from('estado_do_jogo').select('rodada_atual').eq('id', 1).single()
    await supabase.from('estado_do_jogo').update({ 
      rodada_atual: data.rodada_atual + 1, 
      status_rodada: 'em_andamento' 
    }).eq('id', 1)
  }

  const btnStyle = { padding: '15px', fontSize: '16px', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', width: '100%', marginBottom: '15px' }

  return (
    <div style={{ padding: '20px', backgroundColor: '#111827', minHeight: '100vh', color: 'white' }}>
      <h1 style={{ color: '#facc15' }}>🤠 Cockpit do Xerife</h1>
      
      <div style={{ marginTop: '30px' }}>
        <button onClick={() => atualizarStatus('em_andamento')} style={{...btnStyle, backgroundColor: '#16a34a'}}>
          🔥 Iniciar Arraiá (Liberar Botões)
        </button>

        <button onClick={() => atualizarStatus('tempo_esgotado')} style={{...btnStyle, backgroundColor: '#ea580c'}}>
          ⏳ Congelar Telas (Suspense)
        </button>

        <button onClick={() => atualizarStatus('revelado')} style={{...btnStyle, backgroundColor: '#dc2626'}}>
          🚨 Revelar Resposta (Manda pra Cadeia)
        </button>

        <button onClick={proximaRodada} style={{...btnStyle, backgroundColor: '#2563eb'}}>
          ➡️ Lançar Próxima Pergunta
        </button>
      </div>
    </div>
  )
}
