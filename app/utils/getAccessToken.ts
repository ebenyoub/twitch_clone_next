
const getAuthUrl = () => {
    const url = "https://id.twitch.tv/oauth2/authorize";
    const scopes = [
        "channel:read:subscriptions"
    ].join(" ");

    const params = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
        response_type: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
        scope: scopes,
    })

    return url + '?' + params;
}

const getAccessToken = () => {
    const hash = window.location.hash;
    const localStorageAccessToken = localStorage.getItem("access_token");

    if (localStorageAccessToken) {
        // console.log("Token from localStorage");
        return localStorageAccessToken;
    } else {
        if (hash) {
            const params = new URLSearchParams(hash.replace('#', ''));
            const token = params.get('access_token');
            if (token) {
                // console.log("Token from URL");
                localStorage.setItem("access_token", token);
                return token;
            }
        }
    }

    return window.location.href = getAuthUrl();   
};

export default getAccessToken;