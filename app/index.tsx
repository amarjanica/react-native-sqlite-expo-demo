import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Task } from '@/types';
import logger from '@/logger';
import type { ListRenderItem } from '@react-native/virtualized-lists';
import { router } from 'expo-router';
import globalStyles from '@/globalStyles';
import { useDataContext } from '@/data/DataContext';
import { useAppDispatch, useAppSelector } from '@/store';
import { addTaskHandler, selectTasksState } from '@/store/taskSlice';

const LandingPage = () => {
  const { tasksClient } = useDataContext();
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState('');
  const tasks = useAppSelector(selectTasksState);

  const addTask = async () => {
    if (newTask.trim()) {
      dispatch(addTaskHandler({ taskName: newTask, tasksClient }));
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
      style={globalStyles.taskList}
      ListHeaderComponent={
        <View style={globalStyles.inputContainer}>
          <TextInput
            style={globalStyles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity
            style={globalStyles.addButton}
            onPress={addTask}>
            <Text style={globalStyles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default LandingPage;
