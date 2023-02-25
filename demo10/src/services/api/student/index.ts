import {request} from '@umijs/max';
import {Student} from "@/services/types";

export interface GeneralArrayResponse<T> {
    data: T[];
}

async function getAllStudent(values?: Partial<Student>, sort?: Partial<Student>) {
    return new Promise<GeneralArrayResponse<Student>>((resolve) => {
        request('/test/students', {
            method: 'GET',
            params: {
                name: values?.name ? values?.name : undefined,
                sex: values?.sex
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

async function createStudent(data: Partial<Student>) {
    return fetch('/test/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data: {...data}}),
    });
}

export const StudentService = {
    getAllStudent,
    createStudent
};
