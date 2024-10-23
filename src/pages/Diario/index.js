import './style.scss'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../../components/ErrorMessage'
import Paragrafo from '../../components/Paragrafo'

const Diario = () => {
    const location = useLocation()
    const userId = location.state.userId
    const [novoTitulo, setNovoTitulo] = useState('')
    const [modificando, setModificando] = useState(false)
    const [diario, setDiario] = useState({
        titulo: ''
    })
    const [novoParag, setNovoParag] = useState('')
    const [paragrafos, setParagrafos] = useState([])
    const [erro, setErro] = useState('')
    const navigate = useNavigate()
    useEffect( () => {
        buscarDiario()

    }, [])

    async function buscarDiario(){
        await axios.get('http://localhost:5040/diario/usuario/'+userId, {headers: {"x-access-token": localStorage.getItem('tokend')}})
        .then(res => {
            setDiario(res.data)
            buscarParagrafos(res.data.id)
        })
        .catch(err => setErro(err.response.data.erro))
    }
    async function buscarParagrafos(idDiario){
        await axios.get(`http://localhost:5040/paragrafo/diario/${idDiario}`, {headers: {"x-access-token": localStorage.getItem('tokend')}})
        .then(res => setParagrafos(res.data))
        .catch(err => setErro(err.response.data.erro))
    }
    async function adicionarParagrafo(){
        if(novoParag.length > 20)
            await axios.post(`http://localhost:5040/paragrafo?x-access-token=${localStorage.getItem('tokend')}`, {
                conteudo: novoParag,
                diario: diario.id
            })
            .then(res => {
                buscarParagrafos(diario.id)
                setNovoParag('')
            })
            .catch(err => setErro(err.response.data.erro))
        else
            setErro("Parágrafo muito curto")
    }
    async function alterarParagrafo(paragrafo){
        paragrafo = {...paragrafo, diario: diario.id}
        await axios.put(`http://localhost:5040/paragrafo/${paragrafo.id}?x-access-token=${localStorage.getItem('tokend')}`, 
        paragrafo)
        .then(res => buscarParagrafos(diario.id))
        .catch(err => setErro(err.response.data.erro))
    }
    async function apagarParagrafo(id){
        await axios.delete(`http://localhost:5040/paragrafo/${id}?x-access-token=${localStorage.getItem('tokend')}`)
        .then(res => buscarParagrafos(diario.id))
        .catch(err => setErro(err.response.data.erro))
    }
    async function alterarDiario(){
        if(novoTitulo.length <= 60)
            await axios.put(`http://localhost:5040/diario/${diario.id}?x-access-token=${localStorage.getItem('tokend')}`,
            {...diario, titulo: novoTitulo})
            .then(() => {
                setModificando(false)
                setDiario({...diario, titulo: novoTitulo})
                setNovoTitulo('')
            })
            .catch(err => setErro(err.response.data.erro))
    }
    function logoff(){
        localStorage.removeItem('tokend')
        navigate('/')
    }
    return(
        <div className='page_diario'>
            <div className='top'>
                {
                    modificando ?
                    <input maxLength="60" value={novoTitulo} onChange={e => setNovoTitulo(e.target.value)}/>
                    :
                    <h1>{diario.titulo}</h1>
                }
                {
                    modificando ?
                    <button onClick={() => alterarDiario()} className='submit'>
                        <img src='/assets/images/application.png'/>
                    </button>
                    : 
                    ''
                }
                <button onClick={() => {
                    setModificando(!modificando)
                    setNovoTitulo(novoTitulo == ''?diario.titulo:'')
                    }} className='editar'>
                    <img src='/assets/images/pencil.png'/>
                </button>

                <button className='sair' onClick={logoff}>Sair</button>
            </div>
            <div className='paragrafos'>
                {paragrafos.map(p => <Paragrafo id={p.id} deletar={apagarParagrafo} editar={paragrafo => alterarParagrafo(paragrafo)} conteudo={p.conteudo}/>)}
                <textarea maxLength={2000} value={novoParag} onChange={e => setNovoParag(e.target.value)}>

                </textarea>
                <button onClick={adicionarParagrafo}>+</button>
            </div>
            {erro? <ErrorMessage close={() => setErro('')} erro={erro}/>: ''}
        </div>
    )
}

export default Diario