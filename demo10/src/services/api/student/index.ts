import { request } from '@umijs/max';
import { Student } from "@/services/types";

export interface GeneralArrayResponse<T> {
    data: T[];
}

export interface GeneralResponse<T> {
    data: T;
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

async function getStudent(id: number) {
    return new Promise<GeneralResponse<Student>>((resolve) => {
        request(`/test/students/${id}`, { method: 'GET' }).then(res => {
            resolve({
                data: {
                    id: res.data.id,
                    ...res.data.attributes,
                    address: res.data.address ? Object.values(res.data.address) : []
                }
            })
        })
    })
}

async function putStudent(id: number, values?: Partial<Student>) {
    return new Promise<GeneralResponse<Student>>((resolve) => {
        request(`/test/students/${id}`, { method: 'PUT', })
    })
}

async function editStudent(id: number, data: Partial<Student>) {
    return fetch(`/test/students${id}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...data } }),
    });
}

async function createStudent(data: Partial<Student>) {
    return fetch('/test/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...data } }),
    });
}

export const StudentService = {
    getStudent,
    editStudent,
    getAllStudent,
    createStudent
};
