import { FlatList } from "react-native";
import { DoctorCardItem } from "../DoctorCardItem";

export function FavouriteDoctorsList({ favList }) {
  const gotDoctors = favList.attributes.doctors.data;

  return (
    <FlatList
      data={gotDoctors}
      extraData={gotDoctors}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={5}
      contentContainerStyle={{ paddingBottom: 135 }}
      renderItem={({ item }) => (
        <DoctorCardItem
          doctorInfo={item}
          favDoctorsList={gotDoctors}
          favItemId={favList.id}
        />
      )}
    />
  );
}
