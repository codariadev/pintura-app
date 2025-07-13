import { doc, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface ExceptionArea {
  height: string;
  length: string;
}

export interface Room {
  name: string;
  height: string;
  length: string;
  includeCeiling: boolean;
  exceptions: ExceptionArea[];
}

export interface Wall {
  height: string;
  length: string;
}

export interface Budget {
  clientName: string;
  clientAdress: string;
  clientAdressNumber: string;
  valueMass: string;
  valuePaint: string;
  valueSealant: string;
  total: string;
  rooms: {
    name: string;
    height: string;
    length: string;
    width: string;
    includeCeiling: boolean;
    exceptions: ExceptionArea[];
  }[];
  walls: {
    height: string;
    length: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export const createBudget = async (data: Budget): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'budgets'), data);
    return docRef.id;
  } catch (error) {
    console.error('Erro ao criar orçamento:', error);
    throw error;
  }
};

export const updateBudget = async (id: string, data: Partial<Budget>): Promise<void> => {
  try {
    await updateDoc(doc(db, 'budgets', id), data);
  } catch (error) {
    console.error('Erro ao atualizar orçamento:', error);
  }
};

export const getBudget = async (id: string): Promise<Budget | null> => {
  try {
    const docSnap = await getDoc(doc(db, 'budgets', id));
    return docSnap.exists() ? (docSnap.data() as Budget) : null;
  } catch (error) {
    console.error('Erro ao buscar orçamento:', error);
    return null;
  }
};

export const deleteBudget = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'budgets', id));
  } catch (error) {
    console.error('Erro ao deletar orçamento:', error);
  }
};
