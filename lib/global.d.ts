// lib/global.d.ts

/********************************** */
// Token interface
/********************************** */

interface FetchResponse<T> {
    data: T | null;
    error: string | null;
    loading: boolean;
}

/********************************** */
// Stream interface
/********************************** */

declare interface StreamData {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    type: "live" | "recorded";
    title: string;
    tags: string[];
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    tag_ids: string[];
    is_mature: boolean;
}

interface Pagination {
    cursor: string;
}

declare interface StreamsResponse {
    data: StreamData[];
    pagination: Pagination;
}

/********************************** */
// Top Streams
/********************************** */

declare interface TopStreamsData {
    box_art_url: string;
    id: string;
    igdb_id: string
    name: string;
}

/********************************** */
// Combined Streams
/********************************** */

declare interface CombinedStreamData {
    id: string | undefined;
    display_name: string | undefined;
    profile_image_url: string | undefined;
    game_name: string;
    viewer_count: number;
    description: string | undefined;
}

/********************************** */
// User interface
/********************************** */

declare interface UserData {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    email: string;
    created_at: string;
};

declare interface UserResponse {
    data: UserData[];
};

/********************************** */
// Game interface
/********************************** */

// Interface pour un jeu
declare interface GameData {
    id: string;
    name: string;
    box_art_url: string;
    igdb_id: string;
}

// Interface pour la réponse contenant une liste de jeux
declare interface GamesResponse {
    data: GameData[];
}