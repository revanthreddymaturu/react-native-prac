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

const Profile = () => {
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
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={ icons.userIcon}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <Text className="text-white font-psemibold text-sm mt-2">{user_metadata.username}</Text>

            <View className="mt-5 flex flex-row">

            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;