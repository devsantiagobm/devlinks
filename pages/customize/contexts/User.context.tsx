import { ReactNode, createContext, useReducer, Dispatch, useEffect, useState, SetStateAction } from "react";
import type { Link, Profile } from "models";
import { platforms } from "constant";
import { axios, getCookie } from "utilities";
import { COOKIES_NAMES } from "constant";
import { AxiosError, AxiosResponse } from "axios";

export function UserProvider({ children }: { children: ReactNode }) {
    const [links, dispatchLinks] = useReducer(reducerLink, [])
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState<Profile | null>(null)
    const value: Links = { links, dispatchLinks, profile, setProfile, loading }

    useInitializeData({ dispatchLinks, setProfile, setLoading })

    return (
        <UserContext.Provider value={value}>{children}</ UserContext.Provider>
    )
}


export interface ResponseData {
    profile: Profile
    links: Link[]
}

interface HookProps {
    dispatchLinks: Dispatch<Action>,
    setProfile: Dispatch<SetStateAction<Profile | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

function useInitializeData({ dispatchLinks, setProfile, setLoading }: HookProps) {
    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const response: AxiosResponse<ResponseData> = await axios({
                    url: "/user/information",
                    method: "GET",
                    headers: {
                        Authorization: getCookie(COOKIES_NAMES.auth_token),
                        "x-user-id": getCookie(COOKIES_NAMES.user_id)
                    }
                })

                const { profile, links } = response.data

                setProfile(profile)
                dispatchLinks({ type: "initialize", links })

            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data?.message ?? error.message);
                }
                else if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            finally {
                setLoading(false)
            }
        })()

    }, [])
}

interface Action {
    type: "add" | "remove" | "update" | "initialize";
    payload?: Link;
    links?: Link[]
}

function reducerLink(state: Link[], action: Action): Link[] {
    switch (action.type) {
        case 'add':
            return [...state, { url: null, platform: null, id: crypto.randomUUID(), username: null }];
        case 'remove':
            return state.filter(link => link.id !== action?.payload?.id);
        case 'update':
            return state.map(link => link.id === action?.payload?.id ? action.payload : link)
                .map(({ url, username, ...link }) => {
                    // Sync url with username
                    const baseUrl = platforms.find(({ id }) => id === link.platform)?.url

                    return {
                        ...link,
                        url: baseUrl ? baseUrl + username : null,
                        username
                    }
                });
        case "initialize":
            return action.links ?? []
        default:
            return state;
    }
}


interface Links {
    links: Link[],
    dispatchLinks: Dispatch<Action>
    profile: Profile | null
    setProfile: Dispatch<SetStateAction<Profile | null>>
    loading: boolean
}

export const UserContext = createContext<Links | null>(null)