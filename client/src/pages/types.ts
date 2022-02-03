export interface User {
    ID: string
    firstName: string
    lastName: string
    email: string
    role: string
    createdAt: string
}
export interface ModuleType{
    ID:string,
    collectionID:string,
    language:string,
    title:string,
    shortDescription:string,
    longDescription:string,
    video:string,
    uploader:string,
    iat:number
}
export interface Course{
    ID:string,
    collectionID:string,
    title:string,
    shortDescription:string,
    longDescription:string,
    imageUrl:string,
    createdAt:number
}