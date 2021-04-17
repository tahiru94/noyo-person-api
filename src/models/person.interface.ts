interface IPerson {
    _id?: string; // MongoDB specific
    id: string;
    version?: Date;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    age: number;
}

export default IPerson;