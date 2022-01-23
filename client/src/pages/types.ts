// export default interface CourseType {
//     title:String,
//     shortDescription:String,
//     longDescription:String,
//     video:String
// }
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