export async function isValidToken(token: string) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(baseUrl + "/auth/token", { method: "GET", headers: { Authorization: token } })

        if (!response.ok) {
            throw new Error("Token is not valid");
        }

        return true;
    } catch (error) {
        return false;
    }
}