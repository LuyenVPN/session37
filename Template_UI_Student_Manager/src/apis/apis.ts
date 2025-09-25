import axios from "axios"
import type { Student } from "../utils/type"

    // API lay tat ca danh sach sinh vien
export const API_GETALL_STUDENT = "http://localhost:8080/student"

//API them sinh vien

export const API_ADD_STUDENT = async (new_student: Student)=>{
   const response = await axios.post(`http://localhost:8080/student`, new_student)
   return response.data
}
