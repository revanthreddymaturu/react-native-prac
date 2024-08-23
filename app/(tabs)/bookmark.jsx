import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text,View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useSessionContext } from "../../utils/SessionProvider";
import useSupabase from "../../lib/useSupabase";
import { getUserPosts,signOut } from "../../lib/supabase";
import { Redirect } from "expo-router";
import { Alert } from "react-native";
import { useContext } from "react";
const Bookmark = () => {
  const { session } = useSessionContext();
  
  const user_metadata = session?.user?.user_metadata ? session.user.user_metadata : null;

  const { data: posts } = useSupabase(() => getUserPosts(user_metadata.sub));

  const logout = async () => {
    await signOut();
    router.replace("/sign-in");

  };
  if(session==null){
    return <Redirect href="/sign-in" />;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
          videoItem={item}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <Text className="text-white font-pbold text-xl">Bookmarked Videos</Text>
            
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;