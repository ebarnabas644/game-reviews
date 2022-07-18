export interface AppDetail{
    steam_appid: number,
    name: string,
    required_age: number,
    is_free: boolean,
    detailed_description: string,
    about_the_game: string,
    short_description: string,
    supported_languages: string,
    reviews: string,
    header_image: string,
    website: string,
    developers: string,
    publishers: string,
    windows: boolean,
    mac: boolean,
    linux: boolean,
    metacritic_score: number, 
    metacritic_url: string,
    categories: string,
    genres: string,
    screenshots_thumbnail: string,
    screenshots_full: string,
    recommendations: number,
    coming_soon: boolean,
    date: string
}