import './style.scss'
import { useState } from 'react'

const Paragrafo = (props) => {
    const [modificando, setModificando] = useState(false)
    const [conteudo, setConteudo] = useState(props.conteudo)
    function editar(){
        props.editar({id: props.id, conteudo})
        setModificando(false)
    }
    function deletar(){
        props.deletar(props.id)
    }
    return(
        <div className='paragrafo'>
            {modificando? <div className='edicao'>
                        <textarea value={conteudo} onChange={e => setConteudo(e.target.value)}/>
                            <button onClick={editar}>Editar</button>
                    </div>:
            <p >{props.conteudo}</p>
            }
            <div className='botoes'>
                <button onClick={() => setModificando(!modificando)}><img src="/assets/images/pencil.png"/></button>
                <button disabled={modificando} onClick={deletar}><img src="/assets/images/trash.png"/></button>
            </div>
        </div>
    )
}
export default Paragrafo