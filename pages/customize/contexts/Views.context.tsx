import { createContext, useState } from "react";
import { Views } from "pages/customize/models";
import { Dispatch, SetStateAction } from "react";


interface ContextInfo {
    view: Views,
    setView: Dispatch<SetStateAction<Views>>
}

export const ViewsContext = createContext<ContextInfo | null>(null)

export function ViewsProvider({ children }: { children: JSX.Element }) {
    const [view, setView] = useState<Views>("Links")

    const value: ContextInfo = { view, setView }

    return (
        <ViewsContext.Provider value={value}>
            {children}
        </ViewsContext.Provider>
    )
}