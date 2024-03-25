interface UserCreateInterface {
	name: string | null;
	email: string;
	emailVerified?: Date;
	userVerified?: boolean;
	image?: string;
	password?: string;
}

interface UserReadInterface extends UserCreateInterface {
	id: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface UserUpdateInterface {
	name?: string;
	email?: string;
	password?: string;
	image?: string;
	userVerified?: boolean;
	updatedAt?: Date;
}

interface Credentials {
	email: string;
	password: string;
	isProviderLogin?: boolean;
	isProviderAccountId?: string;
}
