import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Platform,
  PermissionsAndroid,
} from "react-native";
import CustomText from "../components/ui/CustomText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTouchableOpacity from "../components/ui/CustomTouchableOpacity";
import { ProfileScreenProps } from "../constants/types";
import { Ionicons } from "@expo/vector-icons";
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

const placeholderImage = "https://via.placeholder.com/150";

const Profile = ({
  navigation,
}: {
  navigation: ProfileScreenProps["navigation"];
}) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        setEmail(parsedUser.email || "");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const imageUri = await AsyncStorage.getItem("profileImage");
      if (imageUri) {
        setProfileImage(imageUri);
      }
    };
    fetchProfileImage();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      const cameraGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      const galleryGranted = await PermissionsAndroid.request(
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return (
        cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
        galleryGranted === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true;
  };

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "You need to grant camera and gallery permissions to update your profile picture."
      );
      return;
    }
    const options: CameraOptions = {
      mediaType: "photo",
      quality: 1,
      saveToPhotos: true,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        AsyncStorage.setItem("profileImage", response.assets[0].uri || "");
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const handleChooseFromGallery = async () => {
    setModalVisible(false);
    const options: ImageLibraryOptions = {
      mediaType: "photo",
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        AsyncStorage.setItem("profileImage", response.assets[0].uri || "");
        setProfileImage(response.assets[0].uri || null);
      }
    });
  };

  const handleRemovePhoto = async () => {
    setModalVisible(false);
    await AsyncStorage.removeItem("profileImage");
    setProfileImage(null);
    Alert.alert("Profile picture removed successfully.");
  };

  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          navigation.replace("Login");
        },
      },
    ]);
  };

  const handleImagePress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomTouchableOpacity onPress={handleImagePress} activeOpacity={0.8}>
          <Image
            source={{ uri: profileImage || placeholderImage }}
            style={styles.profileImage}
          />
          <View style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={20} color="#fff" />
          </View>
        </CustomTouchableOpacity>
      </View>

      <CustomText style={styles.emailText}>{email}</CustomText>

      <CustomTouchableOpacity
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        <CustomText style={styles.logoutButtonText}>Logout</CustomText>
      </CustomTouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <CustomText style={styles.modalTitle}>
              Update Profile Picture
            </CustomText>
            <CustomTouchableOpacity
              style={styles.modalButton}
              onPress={() => handleChooseFromGallery()}
            >
              <CustomText style={styles.modalButtonText}>
                Choose from Gallery
              </CustomText>
            </CustomTouchableOpacity>

            <CustomTouchableOpacity
              style={styles.modalButton}
              onPress={() => handleTakePhoto()}
            >
              <CustomText style={styles.modalButtonText}>
                Take a Photo
              </CustomText>
            </CustomTouchableOpacity>

            <CustomTouchableOpacity
              style={styles.modalButton}
              onPress={() => handleRemovePhoto()}
            >
              <CustomText style={styles.modalButtonText}>
                Remove Photo
              </CustomText>
            </CustomTouchableOpacity>

            <CustomTouchableOpacity onPress={() => setModalVisible(false)}>
              <CustomText style={styles.cancelText}>Cancel</CustomText>
            </CustomTouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#4a90e2",
    borderRadius: 100,
    padding: 5,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4a90e2",
    borderRadius: 20,
    padding: 6,
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 3,
  },
  emailText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 25,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: "center",
    gap: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalButton: {
    backgroundColor: "#4a90e2",
    width: "100%",
    padding: 12,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelText: {
    marginTop: 10,
    color: "#FF3B30",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
