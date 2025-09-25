import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ADD_STUDENT, API_GETALL_STUDENT } from "../../apis/apis";
import type { Student } from "../../utils/type";
interface StudentState {
  students: Student[];
  loading: boolean;
}
const initialState: StudentState = {
  students: [],
  loading: false,
};
export const getAllStudent = createAsyncThunk("getAllUser", async () => {
  try {
    const res: any = await axios.get(`${API_GETALL_STUDENT}`);
    return res.data;
  } catch (error) {
    console.log("Error: ", error);
  }
});
export const addStudent = createAsyncThunk(
  "addStudent",
  async (new_student: any) => {
    try {
      return API_ADD_STUDENT(new_student);
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:8080/student/${id}`);

      return id;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
export const editStudent = createAsyncThunk(
  "editStudent",
  async (student: Student) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/student/${student.id}`,
        {
          name: student.name,
          age: student.age,
          grade: student.grade,
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
);
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   .addCase(getAllStudent.pending, (state, action) => {})
      .addCase(getAllStudent.fulfilled, (state, action) => {
        state.loading = true;
        state.students = action.payload;
      })
      .addCase(addStudent.fulfilled, (state: any, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (st: any) => st.id !== action.payload
        );
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (t: any) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.students[index] = action.payload
        }
      });
  },
});
export default studentSlice.reducer;
