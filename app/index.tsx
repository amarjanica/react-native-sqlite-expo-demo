import { FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Task } from '@/types';
import type { ListRenderItem } from '@react-native/virtualized-lists';
import { router } from 'expo-router';
import globalStyles from '@/globalStyles';
import { useDataContext } from '@/data/DataContext';
import { useAppDispatch, useAppSelector } from '@/store';
import { addTaskHandler, selectTasksState } from '@/store/taskSlice';
import Header from '@/Header';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const LandingPage: React.FC = () => {
  const { taskClient } = useDataContext();
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState('');
  const tasks = useAppSelector(selectTasksState);

  const addTask = async () => {
    if (newTask.trim()) {
      dispatch(addTaskHandler({ taskName: newTask, taskClient }));
      setNewTask('');
    }
  };

  const renderItem: ListRenderItem<Task> = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/detail/${item.id}`)}
      style={globalStyles.taskItem}>
      <Text style={globalStyles.taskText}>{item.task}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={globalStyles.root}
      ListHeaderComponent={
        <Header>
          <TouchableOpacity
            style={globalStyles.button}
            onPress={() => router.push('/settings')}>
            <Text style={globalStyles.buttonText}>
              <Icon
                name="cog"
                size={globalStyles.icon.fontSize}
                color={globalStyles.icon.color}
              />
            </Text>
          </TouchableOpacity>
          <TextInput
            style={globalStyles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity
            style={globalStyles.button}
            onPress={addTask}>
            <Icon
              name="plus"
              size={globalStyles.icon.fontSize}
              color={globalStyles.icon.color}
            />
          </TouchableOpacity>
        </Header>
      }
    />
  );
};

export default LandingPage;
