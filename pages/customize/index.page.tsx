import { Layout } from "components"
import { Header, Preview, Links, Profile } from "./components"
import { memo } from "react"
import { useGetWidth } from "./hooks"
import { Views } from "./models"
import { ViewsProvider, AvatarProvider, UserProvider } from 'pages/customize/contexts'
import { useContextViews } from 'pages/customize/hooks'

export default function Customize() {
    const { isLargeScreen } = useGetWidth()


    return (
        <ViewsProvider>
            <UserProvider>
                <AvatarProvider>
                    <Layout title="Customize your links" className="customize">
                        <Header />
                        <div className="customize__content">
                            {
                                isLargeScreen && <Preview />
                            }
                            <CurrentView />
                        </div>
                    </Layout>

                </AvatarProvider>
            </UserProvider>
        </ViewsProvider >
    )
}



function CurrentView() {
    const VIEWS: Record<Views, () => JSX.Element> = {
        "Links": Links,
        "Profile": Profile
    }

    const { view } = useContextViews()
    const View = memo(VIEWS[view])

    return <View />
}