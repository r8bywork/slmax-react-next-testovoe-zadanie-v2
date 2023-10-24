// import {getPhotos, UnsplashResponse} from "@/api/photos";
// import {getTopics, UnsplashResponseTopics} from "@/api/topics";
//
// export async function getServerSideProps(category?: string, page?: number, per_page?:number, order_by?:string) {
//     const categoriesResponse: UnsplashResponseTopics = await getTopics();
//     const photos: UnsplashResponse = await getPhotos({
//         page: page || 1,
//         per_page: per_page || 10,
//         order_by: order_by || "latest",
//         category: category || "animals"
//     });
//     return [categoriesResponse,photos]
// }
