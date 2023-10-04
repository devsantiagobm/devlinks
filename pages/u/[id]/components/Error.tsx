export function Error({ children }: { children: JSX.Element | string }) {
    return (
        <div className="preview__error">
            <div>
                <h3 className="preview__error-title">Ooops! Something went wrong</h3>
                {children}
            </div>
        </div>
    )
}