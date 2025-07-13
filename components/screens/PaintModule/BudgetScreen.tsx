import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../services/firebaseConfig';

interface Budget {
  clientName: string;
  clientAdress: string;
  clientAdressNumber: string;
  total: number;
  rooms: {
    name: string;
    height: string;
    length: string;
    includeCeiling: boolean;
    exceptions: {
      height: string;
      length: string;
    }[];
  }[];
  walls: {
    height: string;
    length: string;
  }[];
  createdAt?: string;
}

interface BudgetItem {
  id: string;
  data: Budget;
}

const BudgetScreen = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const fetchBudgets = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'budgets'));
      const fetchedBudgets: BudgetItem[] = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        data: docSnap.data() as Budget,
      }));
      setBudgets(fetchedBudgets);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, 'budgets', id));
    setBudgets((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const renderItem = ({ item }: { item: BudgetItem }) => (
    <View className="mb-3 rounded border border-gray-300 bg-white p-4 flex-row justify-between items-center">
      <View className="flex-column mt-2 justify-self-start">
        <Text className="text-lg font-bold">{item.data.clientName}</Text>
        <Text className="text-sm text-gray-500">
          {item.data.clientAdress} - {item.data.clientAdressNumber}
        </Text>
        <View className='flex-row mt-2 gap-5'>
          <Pressable
            className="h-[30px] w-[80px] rounded bg-blue-500 px-3 py-1 flex justify-center items-center"
            onPress={() => navigation.navigate('CreateBudget', { id: item.id })}>
            <Text className="text-white">Editar</Text>
          </Pressable>
          <Pressable
            className="h-[30px] w-[80px] rounded bg-red-500 px-3 py-1 flex justify-center items-center"
            onPress={() => handleDelete(item.id)}>
            <Text className="text-white">Excluir</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text className="text-lg font-bold">R$ {item.data.total}</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      <Text className="mb-4 text-xl font-bold">Orçamentos Salvos</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#8B5CF6" />
      ) : (
        <FlatList
          data={budgets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text className="mt-10 text-center text-gray-400">Nenhum orçamento encontrado.</Text>
          }
        />
      )}
    </View>
  );
};

export default BudgetScreen;
