function SeccionCategoria({ titulo, children }) {
    return (
        <div className="mb-5">
            <h3 className="text-white text-center mb-3 fw-bold">{titulo}</h3>
            <hr className="text-white mb-4" />
            
            <div className="d-flex flex-wrap justify-content-center gap-4">
                {children}
            </div>
        </div>
    );
}

export default SeccionCategoria;