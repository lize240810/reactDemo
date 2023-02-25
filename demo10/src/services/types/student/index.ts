export interface Student {
    name: string;
    sex: boolean;
    id: number
    mail: string
    phone: string
    address: {
        province: string
        city: string
        county: string
    },
    birthday: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    addr?: string[]
}

