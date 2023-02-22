import { request } from '@umijs/max';
import { Student } from "@/services/types";

export interface GeneralArrayResponse<T> {
    data: T[];
}

async function getAllStudent() {
    return new Promise<GeneralArrayResponse<Student>>((resolve) => {
        request('/test/students', {
            method: 'GET',
        }).then(res => {
            resolve({
                data: res.data.map((item: { id: string, attributes: object }) => {
                    return {
                        id: item.id,
                        ...item.attributes
                    }
                })
            })
        })
    })
}

export const StudentService = {
    getAllStudent
};
