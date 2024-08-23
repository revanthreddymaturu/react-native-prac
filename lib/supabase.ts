import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system'
import {generate} from 'shortid'

export const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "", {
    db: { schema: 'aora' },
  
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})


export const getPosts= async () => {
  const { data, error } = await supabase
  .schema('aora')
    .from('videos')
    .select('*,users!videos_creator_fkey(*)')
    .order('created_at', { ascending: false })
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export const getLatestPosts= async () => {
  const { data, error } = await supabase
  .schema('aora')
    .from('videos')
    .select('*,users!videos_creator_fkey(*)')
    .order('created_at', { ascending: false })
    .limit(4)
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export const getPostsBySearchParam= async (query: any) => {
  const { data, error } = await supabase
  .schema('aora')
    .from('videos')
    .select('*,users!videos_creator_fkey(*)')
    .ilike('title', `%${query}%`)
  if (error) {
    console.log(error)
    return []
  }
  return data
}

export const getUserPosts= async (userId: any) => {
  const { data, error } = await supabase
  .schema('aora')
    .from('videos')
    .select('*,users!videos_creator_fkey(*)')
    .eq('creator', `${userId}`)
    .order('created_at', { ascending: false })
  if (error) {
    console.log(error)
    return error
  }
  return data
}

export const signOut= async () => {
  const { error } = await supabase.auth.signOut()
if(error){
  return error;
}
return "signed out";
}

const getPublicURL = (path: any) => {
  const { data } = supabase
  .storage
  .from('files')
  .getPublicUrl(path)
  return data.publicUrl;

}

const uploadFile = async (file: any,type: string) => {
  const contentType=file.mimeType;
  const base64=await FileSystem.readAsStringAsync(file.uri, { encoding: 'base64' });
  const { data, error } = await supabase.storage
    .from('files')
    .upload(`${type}/${generate()}+${file.fileName}`, decode(base64), {
      contentType: contentType,
    })
  if (error) {
    console.log(error)
  }

  return getPublicURL(data?.path);
}
export const createVideoPost= async ({form,userId}) => {
  const [thumbnailURI,videoURI]=await Promise.all([
    uploadFile(form.thumbnail,"images"),
    uploadFile(form.video,"videos")
  ])
  const val={
    title: form.title,
    thumbnail: thumbnailURI,
    prompt: form.prompt,
    creator: userId,
    video:videoURI
  }
  const { error } = await supabase
  .schema('aora')
  .from('videos')
  .insert(val)

if(error){
  return error;
}
}

export const bookmarkVideo= async (videoId,userId) => {
  const { error } = await supabase
  .schema('aora')
  .from('bookmarks')
  .insert({video_id:videoId,user_id:userId})
  if(error){
    return error;
  }
} 




