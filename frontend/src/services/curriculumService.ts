const BASE_URL = "http://localhost:4000/api/curriculum";

export const curriculumService = {
  async getCurriculumByMajor(major: string) {
    try {
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(major)}`); // no extra /curriculum

      if (!res.ok) {
        throw new Error("Failed to fetch curriculum");
      }

      const data = await res.json();
      return data.curriculum; // return the curriculum object directly
    } catch (err) {
      console.error("Error fetching curriculum:", err);
      throw err;
    }
  },
};