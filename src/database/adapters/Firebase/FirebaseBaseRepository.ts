import { FirebaseApp } from "@/database/adapters/Firebase/FirebaseClientAdapter";
import {
	DocumentData,
	Query,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where
} from "firebase/firestore";

export default class FirebaseBaseRepository extends FirebaseApp {
	protected collectionName: string;

	constructor(collectionName: any) {
		super();
		this.collectionName = collectionName;
	}

	getDocRef(id: string) {
		return doc(this.firestore, this.collectionName, id);
	}

	getCollectionRef() {
		return collection(this.firestore, this.collectionName);
	}

	async getData(id: string): Promise<any> {
		return await getDoc(this.getDocRef(id));
	}

	async createData(data: any) {
		return await addDoc(this.getCollectionRef(), data);
	}

	async updateData(id: string, data: any) {
		return await updateDoc(this.getDocRef(id), data);
	}

	async deleteData(id: string) {
		return await deleteDoc(this.getDocRef(id));
	}

	async getAllData() {
		return await getDocs(this.getCollectionRef());
	}

	async getCollectionData() {
		const querySnapshot = await this.getAllData();
		const items: any[] = [];
		querySnapshot.forEach(doc => {
			items.push({ ...doc.data(), id: doc.id });
		});
		return items;
	}

	async getQuery(conditions: QueryInterface[]) {
		const collectionRef = this.getCollectionRef();
		let queryRef: Query<DocumentData> = collectionRef;

		conditions.forEach(condition => {
			queryRef = query(queryRef, where(condition.field, condition.operator, condition.value));
		});

		return queryRef;
	}

	async getQueryData(conditions: QueryInterface[]) {
		const query = await this.getQuery(conditions);
		const querySnapshot = await getDocs(query);
		return querySnapshot;
	}

	async createDataWithCustomId(customId: string, data: any) {
		const docRef = doc(this.firestore, this.collectionName, customId);
		await setDoc(docRef, data);
		return customId;
	}
}

export interface FirebaseCRUDRepository {
	create(data: any): any;
	retrieve(id: number | string): any;
	update(id: number | string, data: any): any;
	delete(id: number | string): any;
	retrieveAll(): any;
	deleteAll(): any;
}
