import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Pressable, Modal, Switch, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createBudget, updateBudget, getBudget } from '../../../services/firebaseFunctions';

interface ExceptionArea {
  height: string;
  length: string;
}

interface Room {
  name: string;
  height: string;
  length: string;
  width: string;
  includeCeiling: boolean;
  exceptions: ExceptionArea[];
}

interface Wall {
  height: string;
  length: string;
}

export default function CreateBudget() {
  const route = useRoute();
  const budgetIdFromRoute = (route.params as { id?: string })?.id;

  const [rooms, setRooms] = useState<Room[]>([]);
  const [walls, setWalls] = useState<Wall[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientAdress, setClientAdress] = useState('');
  const [clientAdressNumber, setClientAdressNumber] = useState('');
  const [budgetId, setBudgetId] = useState<string | null>(null);
  const [valuePaint, setValuePaint] = useState('');
  const [valueMass, setValueMass] = useState('');
  const [valueSealant, setValueSealant] = useState('');
  const [loading, setLoading] = useState(false);

  const [originalBudget, setOriginalBudget] = useState<{
    clientName: string;
    clientAdress: string;
    clientAdressNumber: string;
    rooms: Room[];
    walls: Wall[];
    valueMass?: string;
    valuePaint?: string;
    valueSealant?: string;
  } | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingRoomIndex, setEditingRoomIndex] = useState<number | null>(null);
  const [roomName, setRoomName] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [includeCeiling, setIncludeCeiling] = useState(false);
  const [exceptions, setExceptions] = useState<ExceptionArea[]>([]);
  const [exceptionHeight, setExceptionHeight] = useState('');
  const [exceptionLength, setExceptionLength] = useState('');
  const [showExceptions, setShowExceptions] = useState(false);

  const [wallModalVisible, setWallModalVisible] = useState(false);
  const [editingWallIndex, setEditingWallIndex] = useState<number | null>(null);
  const [wallHeight, setWallHeight] = useState('');
  const [wallLength, setWallLength] = useState('');

  useEffect(() => {
    if (budgetIdFromRoute) {
      setLoading(true);
      getBudget(budgetIdFromRoute)
        .then((budget) => {
          if (budget) {
            setClientName(budget.clientName || '');
            setClientAdress(budget.clientAdress || '');
            setClientAdressNumber(budget.clientAdressNumber || '');
            setRooms(budget.rooms || []);
            setWalls(budget.walls || []);
            setValueMass(budget.valueMass || '');
            setValuePaint(budget.valuePaint || '');
            setValueSealant(budget.valueSealant || '');
            setBudgetId(budgetIdFromRoute);

            setOriginalBudget({
              clientName: budget.clientName || '',
              clientAdress: budget.clientAdress || '',
              clientAdressNumber: budget.clientAdressNumber || '',
              rooms: budget.rooms || [],
              walls: budget.walls || [],
              valueMass: budget.valueMass || '',
              valuePaint: budget.valuePaint || '',
              valueSealant: budget.valueSealant || '',
            });
          }
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
  }, [budgetIdFromRoute]);

  const handleAddOrEditRoom = () => {
    const newRoom: Room = {
      name: roomName,
      height,
      length,
      width,
      includeCeiling,
      exceptions,
    };

    if (editingRoomIndex !== null) {
      const updated = [...rooms];
      updated[editingRoomIndex] = newRoom;
      setRooms(updated);
    } else {
      setRooms((prev) => [...prev, newRoom]);
    }

    setModalVisible(false);
    setEditingRoomIndex(null);
    setRoomName('');
    setHeight('');
    setLength('');
    setWidth('');
    setIncludeCeiling(false);
    setExceptions([]);
    setExceptionHeight('');
    setExceptionLength('');
    setShowExceptions(false);
  };

  const handleAddOrEditWall = () => {
    const newWall: Wall = { height: wallHeight, length: wallLength };

    if (editingWallIndex !== null) {
      const updated = [...walls];
      updated[editingWallIndex] = newWall;
      setWalls(updated);
    } else {
      setWalls((prev) => [...prev, newWall]);
    }

    setWallModalVisible(false);
    setEditingWallIndex(null);
    setWallHeight('');
    setWallLength('');
  };

  const startEditRoom = (index: number) => {
    const room = rooms[index];
    setEditingRoomIndex(index);
    setRoomName(room.name);
    setHeight(room.height);
    setLength(room.length);
    setWidth(room.width);
    setIncludeCeiling(room.includeCeiling);
    setExceptions(room.exceptions ?? []);
    setModalVisible(true);
  };

  const startEditWall = (index: number) => {
    const wall = walls[index];
    setEditingWallIndex(index);
    setWallHeight(wall.height);
    setWallLength(wall.length);
    setWallModalVisible(true);
  };

  const handleAddException = () => {
    if (!exceptionHeight || !exceptionLength) return;

    setExceptions((prev) => [...prev, { height: exceptionHeight, length: exceptionLength }]);
    setExceptionHeight('');
    setExceptionLength('');
  };

  const totalRoomArea = rooms.reduce((sum, room) => {
    const h = parseFloat(room.height.replace(',', '.'));
    const l = parseFloat(room.length.replace(',', '.'));
    const w = parseFloat(room.width?.replace(',', '.') || '0');
    const baseArea = 2 * (h * l + h * w);
    const ceilingArea = room.includeCeiling ? l * w : 0;
    return sum + (isNaN(baseArea) ? 0 : baseArea) + (isNaN(ceilingArea) ? 0 : ceilingArea);
  }, 0);

  const totalWallArea = walls.reduce((sum, wall) => {
    const wallArea = parseFloat(wall.height) * parseFloat(wall.length);
    return sum + (isNaN(wallArea) ? 0 : wallArea);
  }, 0);

  const totalExceptionArea = rooms.reduce((acc, room) => {
    return (
      acc +
      (room.exceptions ?? []).reduce((exTotal, ex) => {
        const eh = parseFloat(ex.height) || 0;
        const el = parseFloat(ex.length) || 0;
        return exTotal + eh * el;
      }, 0)
    );
  }, 0);

  const mTotal = useCallback(() => {
    return (totalRoomArea + totalWallArea - totalExceptionArea).toFixed(0);
  }, [totalRoomArea, totalWallArea, totalExceptionArea]);

  const getTotal = useCallback((): string => {
    const mass = parseFloat(valueMass.replace(',', '.')) || 0;
    const paint = parseFloat(valuePaint.replace(',', '.')) || 0;
    const sealant = parseFloat(valueSealant.replace(',', '.')) || 0;
    const totalArea = parseFloat(mTotal());
    return ((mass + paint + sealant) * totalArea).toFixed(0);
  }, [valueMass, valuePaint, valueSealant, mTotal]);

  const isBudgetChanged = useCallback(() => {
    if (!originalBudget) return true;

    if (
      clientName !== originalBudget.clientName ||
      clientAdress !== originalBudget.clientAdress ||
      clientAdressNumber !== originalBudget.clientAdressNumber ||
      valueMass !== originalBudget.valueMass ||
      valuePaint !== originalBudget.valuePaint ||
      valueSealant !== originalBudget.valueSealant
    )
      return true;

    if (JSON.stringify(rooms) !== JSON.stringify(originalBudget.rooms)) return true;
    if (JSON.stringify(walls) !== JSON.stringify(originalBudget.walls)) return true;

    return false;
  }, [
    clientName,
    clientAdress,
    clientAdressNumber,
    rooms,
    walls,
    originalBudget,
    valueMass,
    valuePaint,
    valueSealant,
  ]);

  const saveBudgetAuto = useCallback(async () => {
    if (!isBudgetChanged()) {
      console.log('Nenhuma alteração para salvar');
      return;
    }

    try {
      const data = {
        clientName,
        clientAdress,
        clientAdressNumber,
        rooms,
        walls,
        valueMass,
        valuePaint,
        valueSealant,
        total: getTotal(),
        updatedAt: new Date().toISOString(),
      };

      if (!budgetId) {
        const newId = await createBudget(data);
        setBudgetId(newId || null);
        setOriginalBudget(data);
      } else {
        await updateBudget(budgetId, data);
        setOriginalBudget(data);
      }
      console.log('Orçamento salvo automaticamente');
    } catch (error) {
      console.error('Erro ao salvar orçamento:', error);
    }
  }, [
    clientName,
    clientAdress,
    clientAdressNumber,
    rooms,
    walls,
    budgetId,
    isBudgetChanged,
    valueMass,
    valuePaint,
    valueSealant,
    getTotal,
  ]);

  const safeParse = (value: string) => {
    const parsed = parseFloat(value.replace(',', '.'));
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      saveBudgetAuto();
    }, 1500);

    return () => clearTimeout(handler);
  }, [
    clientName,
    clientAdress,
    clientAdressNumber,
    rooms,
    walls,
    valueMass,
    valuePaint,
    valueSealant,
    saveBudgetAuto,
  ]);

  if (loading) return <Text className="mt-10 text-center">Carregando orçamento...</Text>;

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16">
      <Text className="mb-6 font-title text-title">
        {budgetId ? 'Editar Orçamento' : 'Novo Orçamento'}
      </Text>

      <View className="flex flex-row flex-wrap gap-5 pb-5">
        <TextInput
          className="mb-4 h-12 w-full rounded border border-gray-300 px-4"
          placeholder="Nome do cliente"
          value={clientName}
          onChangeText={setClientName}
        />
        <TextInput
          className="mb-4 h-12 w-3/4 rounded border border-gray-300 px-4"
          placeholder="Endereço do cliente"
          value={clientAdress}
          onChangeText={setClientAdress}
        />
        <TextInput
          className="mb-4 h-12 flex-1 rounded border border-gray-300 px-4"
          placeholder="Número"
          value={clientAdressNumber}
          onChangeText={setClientAdressNumber}
        />
        <View className="justify-envenly flex w-full flex-row items-center gap-5">
          <TextInput
            className="mb-4 h-12 flex-1 rounded border border-gray-300 px-4 "
            placeholder="M.O Pintura"
            value={valuePaint}
            onChangeText={setValuePaint}
          />
          <TextInput
            className="mb-4 h-12 flex-1 rounded border border-gray-300 px-4"
            placeholder="M.O M. Corrida"
            value={valueMass}
            onChangeText={setValueMass}
          />
          <TextInput
            className="mb-4 h-12 flex-1 rounded border border-gray-300 px-4"
            placeholder="M.O Selante"
            value={valueSealant}
            onChangeText={setValueSealant}
          />
        </View>
      </View>

      <View className="mb-4 w-full flex-row gap-3">
        <Pressable
          className="h-12 flex-1 items-center justify-center rounded bg-[#8B5CF6]"
          onPress={() => {
            setModalVisible(true);
            setEditingRoomIndex(null);
          }}>
          <Text className="text-white">+ Adicionar Cômodo</Text>
        </Pressable>

        <Pressable
          className="h-12 flex-1 items-center justify-center rounded bg-[#10B981]"
          onPress={() => {
            setWallModalVisible(true);
            setEditingWallIndex(null);
          }}>
          <Text className="text-white">+ Adicionar Parede</Text>
        </Pressable>
      </View>

      <Text className="mb-2 text-lg font-semibold">Cômodos:</Text>
      {rooms.map((room, index) => (
        <View key={index} className="mb-2 rounded border border-gray-200 bg-gray-50 p-4">
          <Text className="font-bold">{room.name}</Text>
          <Text>Altura: {room.height} m</Text>
          <Text>Comprimento 1: {room.length} m</Text>
          <Text>Comprimento 2: {room.width} m</Text>
          <Text>Teto: {room.includeCeiling ? 'Sim' : 'Não'}</Text>
          {room.exceptions?.length > 0 && (
            <View className="mt-2">
              <Text className="font-semibold">Exceções:</Text>
              {room.exceptions.map((exc, i) => (
                <Text key={i}>
                  - {exc.height}m x {exc.length}m
                </Text>
              ))}
            </View>
          )}
          <Pressable
            className="mt-2 rounded bg-yellow-400 px-3 py-1"
            onPress={() => startEditRoom(index)}>
            <Text>Editar Cômodo</Text>
          </Pressable>
        </View>
      ))}

      {walls.length > 0 && (
        <>
          <Text className="mb-2 mt-4 text-lg font-semibold">Paredes:</Text>
          {walls.map((wall, index) => (
            <View key={index} className="mb-2 rounded border border-gray-200 bg-gray-50 p-4">
              <Text>
                Parede {index + 1}: {wall.height}m x {wall.length}m
              </Text>
              <Pressable
                className="mt-2 rounded bg-yellow-400 px-3 py-1"
                onPress={() => startEditWall(index)}>
                <Text>Editar Parede</Text>
              </Pressable>
            </View>
          ))}
        </>
      )}

      <View className="mt-4 w-full rounded bg-gray-100 p-4">
        <Text className="mb-2 text-lg font-bold">Resumo:</Text>
        <Text>Total área cômodos: {totalRoomArea.toFixed(2)} m²</Text>
        <Text>Total área paredes: {totalWallArea.toFixed(2)} m²</Text>
        <Text>Total área exceções: {totalExceptionArea.toFixed(2)} m²</Text>
        <Text className="mt-2 font-semibold">Área total estimada: {mTotal()} m²</Text>

        <Text className="mt-2 font-semibold">
          Mão de obra Pintura: R$:
          {isNaN(parseFloat(valuePaint.replace(',', '.')) * parseFloat(mTotal()))
            ? 0
            : parseFloat(valuePaint.replace(',', '.')) * parseFloat(mTotal())}{' '}
        </Text>
        <Text className="mt-2 font-semibold">
          Mão de obra Massa Corrida: R$:
          {isNaN(parseFloat(valueMass.replace(',', '.')) * parseFloat(mTotal()))
            ? 0
            : parseFloat(valueMass.replace(',', '.')) * parseFloat(mTotal())}{' '}
        </Text>
        <Text className="mt-2 font-semibold">
          Mão de obra Selante: R$:
          {isNaN(parseFloat(valueSealant.replace(',', '.')) * parseFloat(mTotal()))
            ? 0
            : parseFloat(valueSealant.replace(',', '.')) * parseFloat(mTotal())}{' '}
        </Text>

        <Text className="mt-2 text-[20px] font-semibold">
          Mão de obra total: R$:
          {(
            (safeParse(valueMass) + safeParse(valueSealant) + safeParse(valuePaint)) *
            parseFloat(mTotal())
          ).toFixed(2)}{' '}
        </Text>
      </View>

      <Pressable
        className="mt-6 h-12 w-full items-center justify-center rounded bg-[#10B981]"
        onPress={saveBudgetAuto}>
        <Text className="font-body text-white">Salvar Orçamento</Text>
      </Pressable>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full rounded-lg bg-white p-6">
            <Text className="mb-4 text-xl font-bold">
              {editingRoomIndex !== null ? 'Editar Cômodo' : 'Adicionar Cômodo'}
            </Text>

            <TextInput
              className="mb-3 h-10 rounded border border-gray-300 px-3"
              placeholder="Nome do cômodo"
              value={roomName}
              onChangeText={setRoomName}
            />
            <TextInput
              className="mb-3 h-10 rounded border border-gray-300 px-3"
              placeholder="Altura (m)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              className="mb-3 h-10 rounded border border-gray-300 px-3"
              placeholder="Comprimento 1 (m)"
              keyboardType="numeric"
              value={length}
              onChangeText={setLength}
            />
            <TextInput
              className="mb-3 h-10 rounded border border-gray-300 px-3"
              placeholder="Comprimento 2 (m)"
              keyboardType="numeric"
              value={width}
              onChangeText={setWidth}
            />

            <View className="mb-4 flex-row items-center justify-between">
              <Text>Incluir teto?</Text>
              <Switch value={includeCeiling} onValueChange={setIncludeCeiling} />
            </View>

            <Pressable className="mb-3" onPress={() => setShowExceptions(!showExceptions)}>
              <Text className="text-[#8B5CF6]">
                {showExceptions ? '- Ocultar exceções' : '+ Adicionar exceções'}
              </Text>
            </Pressable>

            {showExceptions && (
              <View className="mb-4">
                <View className="mb-2 flex-row gap-2">
                  <TextInput
                    className="h-10 flex-1 rounded border border-gray-300 px-3"
                    placeholder="Altura"
                    keyboardType="numeric"
                    value={exceptionHeight}
                    onChangeText={setExceptionHeight}
                  />
                  <TextInput
                    className="h-10 flex-1 rounded border border-gray-300 px-3"
                    placeholder="Comprimento"
                    keyboardType="numeric"
                    value={exceptionLength}
                    onChangeText={setExceptionLength}
                  />
                  <Pressable
                    onPress={handleAddException}
                    className="items-center justify-center rounded bg-[#8B5CF6] px-3">
                    <Text className="text-white">+</Text>
                  </Pressable>
                </View>
                {exceptions.map((exc, i) => (
                  <Text key={i} className="text-sm text-gray-700">
                    Exceção {i + 1}: {exc.height}m x {exc.length}m
                  </Text>
                ))}
              </View>
            )}

            <View className="flex-row justify-between">
              <Pressable
                className="rounded bg-gray-300 px-4 py-2"
                onPress={() => setModalVisible(false)}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable className="rounded bg-[#10B981] px-4 py-2" onPress={handleAddOrEditRoom}>
                <Text className="text-white">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Parede */}
      <Modal visible={wallModalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 items-center justify-center bg-black/50 px-6">
          <View className="w-full rounded-lg bg-white p-6">
            <Text className="mb-4 text-xl font-bold">
              {editingWallIndex !== null ? 'Editar Parede' : 'Adicionar Parede'}
            </Text>

            <TextInput
              className="mb-3 h-10 rounded border border-gray-300 px-3"
              placeholder="Altura da parede (m)"
              keyboardType="numeric"
              value={wallHeight}
              onChangeText={setWallHeight}
            />
            <TextInput
              className="mb-4 h-10 rounded border border-gray-300 px-3"
              placeholder="Comprimento da parede (m)"
              keyboardType="numeric"
              value={wallLength}
              onChangeText={setWallLength}
            />

            <View className="flex-row justify-between">
              <Pressable
                className="rounded bg-gray-300 px-4 py-2"
                onPress={() => setWallModalVisible(false)}>
                <Text>Cancelar</Text>
              </Pressable>
              <Pressable className="rounded bg-[#10B981] px-4 py-2" onPress={handleAddOrEditWall}>
                <Text className="text-white">Salvar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
