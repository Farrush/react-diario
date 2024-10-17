import './style.scss'
const ErrorMessage = (props) => {
    function fechar(){
        props.close()
    }
    return (
        <div className="error">
            <div className="top">
                Erro
            </div>
            <div className="bot">
                <div className='conteudo'>
                    <p>{props.erro}</p>
                </div>
                <button onClick={fechar}>OK</button>
            </div>
        </div>
    )
}
export default ErrorMessage