import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Unmatched } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDataContext } from '@/data/DataContext';
import { useAppDispatch, useAppSelector } from '@/store';
import { removeTaskHandler, selectTask } from '@/store/taskSlice';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const decodedId = parseInt(id);
  const { tasksClient } = useDataContext();
  const dispatch = useAppDispatch();
  const task = useAppSelector(selectTask(decodedId));

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleDelete = async () => {
    dispatch(removeTaskHandler({ tasksClient, id: decodedId }));
    goBack();
  };

  if (!task) {
    return <Unmatched />;
  }
  return (
    <View style={styles.root}>
      <View style={styles.taskItem}>
        <Button
          title="Go back"
          onPress={goBack}
        />
      </View>
      <View style={styles.taskItem}>
        <Text style={styles.taskText}>Task: {task.task}</Text>
      </View>
      <View style={styles.taskItem}>
        <Text style={styles.taskText}>Created: {task.createdAt.toISOString()}</Text>
      </View>
      <View style={styles.taskItem}>
        <Text style={styles.taskText}>Updated: {task.updatedAt.toISOString()}</Text>
      </View>
      <View style={styles.taskItem}>
        <Button
          title="Delete task"
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Page;
