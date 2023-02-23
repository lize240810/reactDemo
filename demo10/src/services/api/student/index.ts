import { request } from '@umijs/max';
import { Student } from "@/services/types";

export interface GeneralArrayResponse<T> {
    data: T[];
}

async function getAllStudent(values?: Partial<Student>, sort?: Partial<Student>) {
    console.log(sort)
    return new Promise<GeneralArrayResponse<Student>>((resolve) => {
        request('/test/students', {
            method: 'GET',
            params: {
                name: values?.name ? values?.name : undefined,
                sex:  values?.sex
            }
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
