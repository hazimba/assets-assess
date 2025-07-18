import apiEndpoints from "@/config/apiEndPoint";
import axios from "axios";

interface fetchEntitiesResponse<T> {
  setfetchEntities: (data: T[]) => void;
  setDataFilter?: (data: T[]) => void;
  entities?: string;
}

export const fetchEntities = async <T>({
  setfetchEntities,
  setDataFilter,
  entities = "courses",
}: fetchEntitiesResponse<T>) => {
  const endPoint =
    entities === "courses"
      ? apiEndpoints.course.getCourses
      : apiEndpoints.user.getUsers;
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_MONGO_DB_API + endPoint
    );
    setfetchEntities(response.data as T[]);
    if (setDataFilter) setDataFilter(response.data);
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
