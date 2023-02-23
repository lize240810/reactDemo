export interface Student {
    name: string;
    sex: boolean;
    id: number
    mail: string
    phone: string
    address: {
        street: string
        suite: string
        city: string
        zipcode: string
    },
    birthday: string
    createDate: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

